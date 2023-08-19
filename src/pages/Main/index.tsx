import React from "react";
import * as Styled from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";

const Main: React.FC = () => {
  return (
    <Styled.Container>
      <h1>
        <FaGithub size={25} />
        My Repositories
      </h1>

      <Styled.Form onSubmit={() => {}}>
        <input
          type='text'
          name='repository'
          id='repositoryId'
          placeholder='Add Repositories'
        />
        <Styled.SubmitButton>
          <FaPlus color='#fff' size={14}  />
        </Styled.SubmitButton>
      </Styled.Form>
    </Styled.Container>
  );
};

export default Main;
