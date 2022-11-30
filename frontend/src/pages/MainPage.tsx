import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { getCookies } from "../lib/restAPI";
import { initializeByToken } from "../modules/actions/auth";
import { RootState } from "../modules/reducer";

const MainPage = ({}) => {
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.auth.login);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("cookie");
      if (cookie) dispatch(initializeByToken(cookie));
    }
  }, []);

  return (
    <MenuTemplate>
      <ListTemplate></ListTemplate>
    </MenuTemplate>
  );
};

export default MainPage;
