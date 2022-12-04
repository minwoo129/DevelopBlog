import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { getCookies } from "../lib/restAPI";
import { initializeByToken } from "../modules/actions/auth";
import { RootState } from "../modules/reducer";
import { tokenCheckThunk } from "../modules/thunk/auth";
import { getBlogsThunk } from "../modules/thunk/blog";

const MainPage = ({}) => {
  return (
    <MenuTemplate>
      <ListTemplate />
    </MenuTemplate>
  );
};

export default MainPage;
