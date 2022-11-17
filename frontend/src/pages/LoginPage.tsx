import React, { FC } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import LoginForm from "../components/auth/LoginForm";
import { LoginPageProps } from "./pageType";

const LoginPage: FC<LoginPageProps> = ({}) => {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
