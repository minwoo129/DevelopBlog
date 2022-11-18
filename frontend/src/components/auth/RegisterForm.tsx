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
    if (email == "") {
      alert("이메일을 입력해주세요.");
      e.preventDefault();
      return;
    }
    if (password == "") {
      alert("비밀번호를 입력해주세요.");
      e.preventDefault();
      return;
    }
    if (passwordConfirm == "") {
      alert("확인용 비밀번호를 입력해주세요.");
      e.preventDefault();
      return;
    }
    if (name == "") {
      alert("이름을 입력해주세요.");
      e.preventDefault();
      return;
    }

    if (password != passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      e.preventDefault();
      return;
    }

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
