import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route element={<MainPage />} path={"/*"} />
      <Route element={<AuthPage />} path={"/auth/login*"} />
      <Route element={<AuthPage />} path={"/auth/join*"} />
      <Route element={<ListPage />} path={"/list*"} />
      <Route element={<SearchPage />} path={"/search*"} />
    </Routes>
  );
}

export default App;
