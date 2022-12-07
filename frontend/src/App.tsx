import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePost from "./pages/WritePost";

const App = () => {
  return (
    <Routes>
      <Route element={<MainPage />} path={"/*"} />
      <Route element={<AuthPage />} path={"/auth/login*"} />
      <Route element={<AuthPage />} path={"/auth/join*"} />
      <Route element={<SearchPage />} path={"/search*"} />
      <Route element={<WritePost />} path={"/write/*"} />
      <Route element={<DetailPage />} path={"/detail/*"} />
    </Routes>
  );
};

export default App;
