// import { QueryClient, QueryClientProvider } from 'react-query'
import React from "react";
import RoutesPath from "./routes";
import GlobalStyles from "./styles/globalStyles";

// const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <>
      <RoutesPath />
      <GlobalStyles />
    </>
  );
};

export default App;
