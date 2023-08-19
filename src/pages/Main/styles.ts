import styled, { css, keyframes } from "styled-components";

type TButton = {
    loading: boolean
}

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  svg {
    margin-right: 10px;
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #d2d2d2;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

const spinnerEffect = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;
export const SubmitButton = styled.button<TButton>`
  background: #222;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 10px 0 19px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #444;
    transition: ease 0.3s;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${spinnerEffect} 2s linear infinite;
      }
    `}
`;
