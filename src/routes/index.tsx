import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Repository from "../pages/Repository";

const RoutesPath: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repository/:repo' element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesPath;
