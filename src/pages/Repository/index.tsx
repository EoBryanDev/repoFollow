import React from "react";
import { useParams } from "react-router";

const Repository: React.FC = () => {
  const { repo } = useParams();
  return <h1 style={{ color: "#fff" }}>{decodeURIComponent(repo!)}</h1>;
};

export default Repository;
