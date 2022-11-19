import React, { FC, HTMLAttributes } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";

interface AuthPageProps extends HTMLAttributes<HTMLDivElement> {}

const AuthPage: FC<AuthPageProps> = (props) => {
  return (
    <MenuTemplate>
      <AuthTemplate></AuthTemplate>
    </MenuTemplate>
  );
};

export default AuthPage;
