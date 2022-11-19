import { Route, Routes } from "react-router-dom";
import "./App.css";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route element={<MainPage />} path={"/*"} />
      <Route element={<LoginPage />} path={"/login*"} />
      <Route element={<ListPage />} path={"/list*"} />
      <Route element={<SearchPage />} path={"/search*"} />
    </Routes>
  );
}

export default App;
