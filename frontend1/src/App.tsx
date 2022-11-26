import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { initializeByToken } from "./modules/auth";
import { getCookies } from "./modules/restAPI";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePost from "./pages/WritePost";

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.auth.login);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("cookie");
      if (cookie) dispatch(initializeByToken(cookie));
    }
  }, [login]);
  return (
    <Routes>
      <Route element={<MainPage />} path={"/*"} />
      <Route element={<AuthPage />} path={"/auth/login*"} />
      <Route element={<AuthPage />} path={"/auth/join*"} />
      <Route element={<ListPage />} path={"/list*"} />
      <Route element={<SearchPage />} path={"/search*"} />
      <Route element={<WritePost />} path={"/write"} />
    </Routes>
  );
};

export default App;
