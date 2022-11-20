import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { loginToken } from "./modules/auth";
import { getCookies } from "./modules/restAPI";
import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePost from "./pages/WritePost";

const App = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    firstLogin();
  }, []);

  const firstLogin = async () => {
    console.log("firstLogin");
    try {
      const result = await dispatch(loginToken({}));
    } catch (e) {
      console.log("firstLogin error: ", e);
    }
  };

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
