/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
// import {useMutation} from 'react-query'
import * as Styled from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";

const Main: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repo, setRepo] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const submit = async () => {
        setIsLoading(true);
        try {
          const resp = await api.get(`repos/${newRepo}`);
          console.log(resp);
          
          const data = {
            name: resp.data.full_name,
          };
          setRepo([...repo, data]);
          setNewRepo("");
        } catch (e: unknown) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      };
      submit();
    },
    [newRepo, repo]
  );

  const handleDelete = useCallback((repoName: string) => {
    const find = repo.filter(i => i.name !== repoName)
    setRepo(find)
  },[repo])
  return (
    <Styled.Container>
      <h1>
        <FaGithub size={25} />
        My Repositories
      </h1>

      <Styled.Form onSubmit={handleSubmit}>
        <input
          type='text'
          name='repository'
          id='repositoryId'
          placeholder='Add Repositories'
          value={newRepo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);

            setNewRepo(e.target.value);
          }}
        />
        <Styled.SubmitButton type="submit" disabled={isLoading} loading={isLoading || undefined}>
          {(isLoading && <FaSpinner color='#FFF' size={14} />) || (
            <FaPlus color='#fff' size={14} />
          )}
        </Styled.SubmitButton>
      </Styled.Form>

      <Styled.List>
        {repo.map((rep) => (
          <li key={rep.name}>
            <span>
              <Styled.DeleteButton type="button" onClick={() => handleDelete(rep.name)}>
                <FaTrash size={14} />
              </Styled.DeleteButton>
            {rep.name}
            </span>


            <a href=''>
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default Main;
