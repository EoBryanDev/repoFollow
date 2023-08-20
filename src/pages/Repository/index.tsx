import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Styled from "./styles";
import api from "../../services/api";
import { IRepo } from "../../interfaces/IRepo";
import { FaArrowLeft } from "react-icons/fa";
import { IIssues } from "../../interfaces/IIssues";

const Repository: React.FC = () => {
  const { repo } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repository, setRepository] = useState<IRepo | null>(null);
  const [issues, setIssues] = useState<IIssues[] | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getRepo = async () => {
      setIsLoading(true);
      try {
        const [respData, issuesData] = await Promise.all([
          api.get(`/repos/${decodeURIComponent(repo!)}`),
          api.get(`/repos/${decodeURIComponent(repo!)}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]);

        setRepository(respData.data);
        setIssues(issuesData.data);
      } catch (e: unknown) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getRepo();
  }, [repo]);

  useEffect(() => {
    const loadIssuesPag = async () => {
      const resp = await api.get(`/repos/${decodeURIComponent(repo!)}/issues`, {
        params: {
          state: "open",
          page,
          per_page: 5,
        },
      });
      setIssues(resp.data);
    };
    loadIssuesPag();
  }, [page, repo]);

  const handlePage = (action: string) => {
    setPage(action === "p" ? (page - 1 < 1 ? 1 : page - 1) : page + 1);
  };
  if (isLoading) {
    return (
      <Styled.Loading>
        <h1>Loading...</h1>
      </Styled.Loading>
    );
  }
  return (
    <Styled.Container>
      <Styled.BackButton to='/'>
        <FaArrowLeft color='#222' size={30} />
      </Styled.BackButton>
      <Styled.Owner>
        <img src={repository?.owner.avatar_url} alt={repository?.owner.login} />
        <h1>{repository?.name}</h1>
        <p>{repository?.description}</p>
      </Styled.Owner>

      <Styled.IssuesList>
        {issues?.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </Styled.IssuesList>
      <Styled.PageActions>
        <button
          type='button'
          onClick={() => handlePage("p")}
          disabled={page - 1 < 1}
        >
          Prev
        </button>
        <button type='button' onClick={() => handlePage("n")}>
          Next
        </button>
      </Styled.PageActions>
    </Styled.Container>
  );
};

export default Repository;
