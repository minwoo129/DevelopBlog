import React, { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeField } from "../../modules/actions/auth";
import { invokeFileUpload } from "../../lib/restAPI";
import { joinThunk, loginThunk } from "../../modules/thunk/auth";
import { RootState } from "../../modules/reducer";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { setMenuOpen } from "../../modules/actions/menu";
import { setAppState } from "../../modules/actions/appInfo";
import { isActiveInServer } from "../../config";
import { getBlogsThunk } from "../../modules/thunk/blog";
import {
  AuthTemplateProps,
  onChange,
  onChangeImg,
  onCheckAdmin,
  onSubmit,
  pageEnableType,
  _join,
  __uploadImageFile,
} from "../../pages/AuthPage/AuthPageTypes";

const AuthTemplateBlock = styled.div`
  flex: 1;
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

const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const dispatch = useDispatch<any>();
  const joinForm = useSelector((state: RootState) => state.auth.joinForm);
  const loginForm = useSelector((state: RootState) => state.auth.loginForm);
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  const location = useLocation();
  const type = useMemo((): pageEnableType => {
    let type: pageEnableType = "loginForm";
    if (location.pathname.indexOf("login") != -1) type = "loginForm";
    else type = "joinForm";
    return type;
  }, [location]);
  const [imgSrc, setImgSrc] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (type == "joinForm") {
      document.title = "DEVLOG-로그인";
    } else {
      document.title = "DEVLOG-회원가입";
    }
  }, [type]);

  const onChange: onChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: type, key: name, value }));
  };
  const onChangeImg: onChangeImg = (data) => {
    dispatch(changeField({ form: type, key: "imageFile", value: data }));
  };
  const onCheckAdmin: onCheckAdmin = (value) => {
    dispatch(changeField({ form: "joinForm", key: "isAdmin", value }));
  };
  const onSubmit: onSubmit = async (e) => {
    e.preventDefault();
    if (type == "joinForm") {
      const { email, pwd, name, isAdmin, adminPwd, nickname, imageFile } =
        joinForm;
      if (!joinValidationCheck()) return;
      __uploadImageFile({
        email,
        password: pwd,
        adminPwd,
        imageFile,
        isAdmin,
        name,
        nickname,
      });
    } else {
      const { email, pwd } = loginForm;
      if (!loginValidationCheck()) return;
      _login(email, pwd);
    }
  };

  const joinValidationCheck = () => {
    const { email, pwd, pwdCheck, name } = joinForm;
    let result = true;
    if (email == "") {
      alert("이메일을 입력해주세요.");
      result = false;
    }
    if (pwd == "") {
      alert("비밀번호를 입력해주세요.");
      result = false;
    }
    if (pwdCheck == "") {
      alert("확인용 비밀번호를 입력해주세요.");
      result = false;
    }
    if (name == "") {
      alert("이름을 입력해주세요.");
      result = false;
    }
    if (pwd != pwdCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      result = false;
    }
    return result;
  };

  const loginValidationCheck = () => {
    const { email, pwd } = loginForm;
    let result = true;
    if (email == "") {
      alert("이메일을 입력해주세요.");
      result = false;
    }
    if (pwd == "") {
      alert("비밀번호를 입력해주세요.");
      result = false;
    }
    return result;
  };

  const __uploadImageFile: __uploadImageFile = async (props) => {
    const { imageFile, adminPwd, email, isAdmin, name, nickname, password } =
      props;
    if (!imageFile) {
      _join({
        adminPwd,
        email,
        isAdmin,
        name,
        nickname,
        password,
        profileImgIdx: null,
      });
      return;
    }

    let profileImgIdx: null | number = null;
    try {
      const result = await invokeFileUpload({
        path: "/api/files/upload/join",
        data: imageFile,
        uploadType: "image/user",
      });
      profileImgIdx = result.data.data.id;
    } catch (err) {
      !isActiveInServer &&
        console.log("AuthTemplate __uploadImageFile error: ", err);
    } finally {
      _join({
        adminPwd,
        email,
        isAdmin,
        name,
        nickname,
        password,
        profileImgIdx,
      });
    }
  };

  const _join: _join = async (props) => {
    const {
      adminPwd,
      email,
      profileImgIdx,
      isAdmin,
      name,
      nickname,
      password,
    } = props;
    try {
      await dispatch(
        joinThunk({
          data: {
            email,
            password,
            name,
            isAdmin,
            adminPwd,
            nickname,
            profileImgIdx,
          },
        })
      );
      setImgSrc(null);
      navigate("/auth/login");
    } catch (err) {
      !isActiveInServer && console.log("AuthTemplate _join error: ", err);
    }
  };

  const _login = async (email: string, password: string) => {
    try {
      const result = await dispatch(
        loginThunk({
          data: {
            email,
            password,
          },
        })
      );
      if (result.data?.backgroundImg) {
        await dispatch(
          setAppState({
            key: "backgroundImgSrc",
            value: result.data.backgroundImg.publishedUrl,
          })
        );
      }
      await _getBlogs();
      navigate("/");
    } catch (e: any) {
      !isActiveInServer &&
        console.log("AuthTemplate _login error: ", e.response);
      if (e.response.data.code == 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const _getBlogs = async () => {
    try {
      const result = await dispatch(
        getBlogsThunk({
          params: {
            page: 1,
            size: 20,
          },
        })
      );
    } catch (err) {
      !isActiveInServer && console.log("MainPage _getBlogs error: ", err);
    }
  };

  return (
    <AuthTemplateBlock>
      {!isMenuVisible && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge={false}
          onClick={() => dispatch(setMenuOpen(true))}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <WhiteBox>
        <AuthForm
          formType={type}
          form={type == "joinForm" ? joinForm : loginForm}
          onChange={onChange}
          onCheckAdmin={onCheckAdmin}
          onSubmit={onSubmit}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          onChangeImg={onChangeImg}
        />
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
