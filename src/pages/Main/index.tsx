/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useEffect } from "react";
// import {useMutation} from 'react-query'
import * as Styled from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [selected, setSelected] = useState<{ name: string }>({ name: "" });
  const [repo, setRepo] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    alert: boolean;
    alertMsg: string;
  }>({ alert: false, alertMsg: "" });

  useEffect(() => {
    const storageRepo = localStorage.getItem("repos");
    if (storageRepo) {
      setRepo(JSON.parse(storageRepo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repo));
  }, [repo]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const submit = async () => {
        setIsLoading(true);
        setAlert({ alert: false, alertMsg: "" });
        if (newRepo === "") {
          setAlert({
            alert: true,
            alertMsg: "Field repository can not be empty!",
          });
          setIsLoading(false);
          throw new Error("Field repository can not be empty!");
        }
        try {
          const hasRepo = repo.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            setAlert({ alert: true, alertMsg: "Repository already added!" });
            setIsLoading(false);
            throw new Error("Repository already added!");
          }
          const resp = await api.get(`repos/${newRepo}`);
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

  const handleDelete = useCallback(
    (repoName: string) => {
      const find = repo.filter((i) => i.name !== repoName);
      setRepo(find);
      localStorage.removeItem(repoName);
    },
    [repo]
  );
  return (
    <Styled.Container>
      <h1>
        <FaGithub size={25} />
        My Repositories
      </h1>

      <Styled.Form onSubmit={handleSubmit} alert={alert.alert}>
        <input
          type='text'
          name='repository'
          id='repositoryId'
          placeholder='Add Repositories'
          value={newRepo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewRepo(e.target.value);
            if (alert.alert) {
              setAlert({ alert: false, alertMsg: "" });
            }
          }}
        />
        <Styled.SubmitButton
          type='submit'
          disabled={isLoading}
          loading={isLoading || undefined}
        >
          {(isLoading && <FaSpinner color='#FFF' size={14} />) || (
            <FaPlus color='#fff' size={14} />
          )}
        </Styled.SubmitButton>
      </Styled.Form>
      {alert && <span>{alert.alertMsg}</span>}

      <Styled.List>
        {repo.map((rep) => (
          <li key={rep.name}>
            <span>
              <Styled.DeleteButton
                type='button'
                onClick={() => handleDelete(rep.name)}
              >
                <FaTrash size={14} />
              </Styled.DeleteButton>
              {rep.name}
            </span>

            <Link to={`/repository/${encodeURIComponent(selected.name)}`}>
              <FaBars size={20} onMouseOver={() => setSelected(rep)} />
            </Link>
          </li>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default Main;
