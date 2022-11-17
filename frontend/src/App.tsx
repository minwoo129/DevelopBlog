import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/*" />
      <Route element={<RegisterPage />} path="/register" />
    </Routes>
  );
}

export default App;
