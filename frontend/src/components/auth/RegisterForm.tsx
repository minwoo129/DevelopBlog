import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../../modules/actions/auth";
import { RootState } from "../../modules/reducer";
import AuthForm from "./AuthForm";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.auth.register);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "register", key: name, value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { email, password, passwordConfirm, isAdmin, name, adminPwd } = form;
    e.preventDefault();
  };
  const onCheckAdmin = (value: boolean) => {
    dispatch(changeField({ form: "register", key: "isAdmin", value }));
  };

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onCheckAdmin={onCheckAdmin}
    />
  );
};

export default RegisterForm;
