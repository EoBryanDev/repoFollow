import { Link } from "react-router-dom";
import styled from "styled-components";

export const Loading = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }
  h1 {
    font-size: 30px;
    color: #222;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;
export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #d2d2d2;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #333;
  }
  div {
    flex: 1;
    margin-left: 12px;

    p {
      margin-top: 10px;
      font-size: 12px;
      color: #222;
    }
  }

  strong {
    font-size: 15px;

    a {
      text-decoration: none;
      color: #333;
      transition: 0.3s;

      &:hover {
        color: #d2d2d2;
      }
    }
    span {
      background: #222;
      color: #fff;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      padding: 1px 7px;
      margin-left: 10px;
    }
  }
`;
