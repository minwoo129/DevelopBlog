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
  const dispatch = useDispatch<any>();
  const login = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("access_token");
      if (cookie) _tokenCheck();
      _getBlogs();
    }
  }, []);

  const _tokenCheck = async () => {
    try {
      await dispatch(tokenCheckThunk({}));
    } catch (e) {
      console.log("MainPage _tokenCheck error: ", e);
    }
  };

  const _getBlogs = async () => {
    try {
      const result = await dispatch(
        getBlogsThunk({
          params: {
            page: 1,
            size: 20,
          },
        })
      );
      console.log("MainPage _getBlogs result: ", result);
    } catch (err) {
      console.log("MainPage _getBlogs error: ", err);
    }
  };

  return (
    <MenuTemplate>
      <ListTemplate></ListTemplate>
    </MenuTemplate>
  );
};

export default MainPage;
