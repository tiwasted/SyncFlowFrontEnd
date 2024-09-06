import React from "react";
import MainApp from "./components/MainApp";
import { AuthProvider } from "./services/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
