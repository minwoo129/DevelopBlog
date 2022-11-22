import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  useMemo,
} from "react";
import styled from "styled-components";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useSelector } from "react-redux";
import { changeField, login } from "../../modules/auth";
import invokeAPI from "../../modules/restAPI";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";

const AuthTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid green;
  background: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

interface AuthTemplateProps extends HTMLAttributes<HTMLDivElement> {}
type pageEnableType = "loginForm" | "joinForm";

const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const dispatch = useDispatch<any>();
  const joinForm = useSelector((state: any) => state.auth.joinForm);
  const loginForm = useSelector((state: any) => state.auth.loginForm);
  const location = useLocation();
  const type = useMemo((): pageEnableType => {
    let type: pageEnableType = "loginForm";
    if (location.pathname.indexOf("login") != -1) type = "loginForm";
    else type = "joinForm";
    return type;
  }, [location]);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: type, key: name, value }));
  };
  const onCheckAdmin = (value: boolean) => {
    dispatch(changeField({ form: "join", key: "isAdmin", value }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type == "joinForm") {
      const { email, pwd, pwdCheck, name, isAdmin, adminPwd } = joinForm;
      if (email == "") {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (pwd == "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      if (pwdCheck == "") {
        alert("확인용 비밀번호를 입력해주세요.");
        return;
      }
      if (name == "") {
        alert("이름을 입력해주세요.");
        return;
      }
      if (pwd != pwdCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      try {
        const result = await invokeAPI({
          method: "post",
          path: "/users/join",
        })({
          data: {
            email,
            password: pwd,
            name,
            isAdmin,
            adminPwd,
          },
        });
        console.log("join result: ", result);
        navigate("/auth/login");
      } catch (e: any) {
        console.log("error: ", e.response);
      }
    } else {
      const { email, pwd } = loginForm;
      if (email == "") {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (pwd == "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      try {
        const result = await dispatch(
          login({
            data: {
              email,
              password: pwd,
            },
          })
        );
        console.log("login result: ", result);
        navigate("/");
      } catch (e: any) {
        console.log("error: ", e.response);
      }
    }
  };
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <AuthForm
          formType={type}
          form={type == "joinForm" ? joinForm : loginForm}
          onChange={onChange}
          onCheckAdmin={onCheckAdmin}
          onSubmit={onSubmit}
        />
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
