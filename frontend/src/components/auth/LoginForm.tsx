import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/actions/auth";
import { RootState } from "../../modules/reducer";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.auth.login);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
