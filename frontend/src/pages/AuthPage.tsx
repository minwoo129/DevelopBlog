import React, { FC, HTMLAttributes, useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import AuthTemplate from "../components/auth/AuthTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { setSearchTxt } from "../modules/actions/appInfo";
import { clearSearchBlogs } from "../modules/actions/blog";

interface AuthPageProps extends HTMLAttributes<HTMLDivElement> {}

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
