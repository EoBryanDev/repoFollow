import styled, { css, keyframes } from "styled-components";

type TButtonParam = {
  loading: boolean | undefined;
};
type TFormParam = {
  alert: boolean;
};

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
export const Form = styled.form<TFormParam>`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${({ alert }) => (alert ? "#ff0000" : "#d2d2d2")};
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
export const SubmitButton = styled.button<TButtonParam>`
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

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  & + li {
    border-top: 1px solid #eee;
  }

  a {
    color: #222;
    text-decoration: none;
  }
`;
export const DeleteButton = styled.button`
  background: transparent;
  color: #222;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;
