import React, { ChangeEvent, FormEvent, useEffect } from "react";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <AuthForm type="login" onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginForm;
