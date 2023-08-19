import React from "react";
import RoutesPath from "./routes";
import GlobalStyles from "./styles/globalStyles";

const App: React.FC = () => {
  return (
    <GlobalStyles>
      <RoutesPath />
    </GlobalStyles>
  );
};

export default App;
