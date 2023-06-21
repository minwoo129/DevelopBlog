import React, { FC, HTMLAttributes, useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import AuthTemplate from "../../components/auth/AuthTemplate";
import MenuTemplate from "../../components/menu/MenuTemplate";
import { AuthPageProps } from "./AuthPageTypes";
import { clearSearchBlogs } from "../../redux/slice/Blog";
import { setSearchTxt } from "../../redux/slice/AppInfo";

const AuthPage: FC<AuthPageProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    batch(() => {
      dispatch(clearSearchBlogs());
      dispatch(setSearchTxt(""));
    });
  }, []);

  return (
    <MenuTemplate {...props}>
      <AuthTemplate />
    </MenuTemplate>
  );
};

export default AuthPage;
