import React, { FC, HTMLAttributes } from "react";
import LoginTemplate from "../components/login/LoginTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";

interface LoginPageProps extends HTMLAttributes<HTMLDivElement> {}

const LoginPage: FC<LoginPageProps> = (props) => {
  return (
    <MenuTemplate>
      <LoginTemplate></LoginTemplate>
    </MenuTemplate>
  );
};

export default LoginPage;
