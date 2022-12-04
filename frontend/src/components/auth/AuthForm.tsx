import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../common/Button";
import CheckAdminSection from "./CheckAdminSection";
import Footer from "./Footer";
import StyledInput from "./StyledInput";

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: #343a40;
    margin-bottom: 1rem;
  }
`;
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const textMap = {
  loginForm: "로그인",
  joinForm: "회원가입",
};

interface AuthFormProps {
  formType: "loginForm" | "joinForm";
  form?: {
    email: string;
    pwd: string;
    pwdCheck?: string;
    name?: string;
    isAdmin?: boolean;
    adminPwd?: string;
    nickname?: string;
  };
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onCheckAdmin?(value: boolean): void;
  onSubmit(e: FormEvent<HTMLFormElement>): void;
}

const AuthForm: FC<AuthFormProps> = ({
  formType,
  form,
  onChange,
  onSubmit,
  onCheckAdmin,
}) => {
  const title = useMemo(() => textMap[formType], [formType]);
  return (
    <AuthFormBlock>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        {formType == "joinForm" && (
          <StyledInput
            autoComplete="name"
            name="name"
            placeholder="사용자 이름"
            value={form?.name}
            onChange={onChange}
          />
        )}
        {formType == "joinForm" && (
          <StyledInput
            autoComplete="nickname"
            name="nickname"
            placeholder="닉네임"
            value={form?.nickname}
            onChange={onChange}
          />
        )}
        <StyledInput
          autoCapitalize="email"
          name="email"
          placeholder="이메일"
          value={form?.email}
          onChange={onChange}
          type={"email"}
        />
        <StyledInput
          autoComplete="pwd"
          name="pwd"
          placeholder="비밀번호"
          value={form?.pwd}
          onChange={onChange}
          type={"password"}
        />
        {formType == "joinForm" && (
          <StyledInput
            autoComplete="pwdCheck"
            name="pwdCheck"
            placeholder="비밀번호"
            value={form?.pwdCheck}
            onChange={onChange}
            type={"password"}
          />
        )}
        {formType == "joinForm" && (
          <CheckAdminSection
            checked={form?.isAdmin}
            onClick={onCheckAdmin}
            onChange={onChange}
            adminPwd={form?.adminPwd}
          />
        )}
        <ButtonWithMarginTop cyan fullWidth style={{ marginTop: "1rem" }}>
          {title}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {formType == "loginForm" ? (
          <Link to="/auth/join">회원가입</Link>
        ) : (
          <Link to="/auth/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
