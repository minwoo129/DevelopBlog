import React, { ChangeEvent, FormEvent } from "react";
import AuthForm from "./AuthForm";

const RegisterForm = () => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log("register name: ", name);
    console.log("register value: ", value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <AuthForm type="register" onChange={onChange} onSubmit={onSubmit} />;
};

export default RegisterForm;
