import React, { ChangeEvent, FormEvent, useEffect } from "react";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("login name: ", name);
    console.log("login value: ", value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <AuthForm type="login" onChange={onChange} onSubmit={onSubmit} />;
};

export default LoginForm;
