import React, { ChangeEvent, FC, FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import CheckAdminSection from "../common/CheckAdminSection";
import StyledInput from "./StyledInput";

/* 
    회원가입, 로그인 폼
*/

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

type AuthFormProps = {
  type: "login" | "register";
  form: {
    email: string;
    password: string;
    passwordConfirm?: string;
    name?: string;
    isAdmin?: boolean;
    adminPwd?: string;
  };
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onCheckAdmin?(value: boolean): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
};

const AuthForm: FC<AuthFormProps> = ({
  type,
  form,
  onChange,
  onSubmit,
  onCheckAdmin,
}) => {
  const text = useMemo(() => textMap[type], [type]);

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        {type == "register" && (
          <StyledInput
            autoComplete="name"
            name="name"
            placeholder="사용자 이름"
            onChange={onChange}
            value={form.name}
          />
        )}
        <StyledInput
          autoComplete="email"
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={form.email}
          type={"email"}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type={"password"}
          onChange={onChange}
          value={form.password}
        />
        {type == "register" && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type={"password"}
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        {type == "register" && (
          <CheckAdminSection
            checked={form?.isAdmin}
            onClick={onCheckAdmin}
            onChange={onChange}
            adminPwd={form.adminPwd}
          />
        )}

        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type == "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
