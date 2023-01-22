import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { getCookies } from "../lib/restAPI";
import { setSearchTxt } from "../modules/actions/appInfo";
import { initializeByToken } from "../modules/actions/auth";
import { clearSearchBlogs } from "../modules/actions/blog";
import { RootState } from "../modules/reducer";
import { tokenCheckThunk } from "../modules/thunk/auth";
import { getBlogsThunk } from "../modules/thunk/blog";

const MainPage = ({}) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    document.title = "DEVLOG";
    batch(() => {
      dispatch(clearSearchBlogs());
      dispatch(setSearchTxt(""));
    });
  }, []);

  return (
    <MenuTemplate>
      <ListTemplate />
    </MenuTemplate>
  );
};

export default MainPage;
