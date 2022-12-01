import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { getCookies } from "../lib/restAPI";
import { initializeByToken } from "../modules/actions/auth";
import { RootState } from "../modules/reducer";
import { tokenCheckThunk } from "../modules/thunk/auth";

const MainPage = ({}) => {
  const dispatch = useDispatch<any>();
  const login = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("access_token");
      if (cookie) _tokenCheck();
    }
  }, []);

  const _tokenCheck = async () => {
    try {
      await dispatch(tokenCheckThunk({}));
    } catch (e) {
      console.log("MainPage _tokenCheck error: ", e);
    }
  };

  return (
    <MenuTemplate>
      <ListTemplate></ListTemplate>
    </MenuTemplate>
  );
};

export default MainPage;
