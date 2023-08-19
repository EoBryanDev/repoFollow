/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback } from "react";
// import {useMutation} from 'react-query'
import * as Styled from "./styles";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

const Main: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repo, setRepo] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault;
      const submit = async () => {
        setIsLoading(true);
        try {
          const resp = await api.get(`repos/${newRepo}`);
          const data = {
            name: resp.data.fullName,
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
        <Styled.SubmitButton disabled={isLoading} loading={isLoading}>
          {(isLoading && <FaSpinner color='#FFF' size={14} />) || (
            <FaPlus color='#fff' size={14} />
          )}
        </Styled.SubmitButton>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Main;
