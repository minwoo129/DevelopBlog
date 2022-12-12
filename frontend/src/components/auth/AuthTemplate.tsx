import React, {
  ChangeEvent,
  FC,
  FormEvent,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useSelector } from "react-redux";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { changeField, login } from "../../modules/actions/auth";
import invokeAPI, { invokeFileUpload } from "../../lib/restAPI";
import { joinThunk, loginThunk } from "../../modules/thunk/auth";
import { RootState } from "../../modules/reducer";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { setMenuOpen } from "../../modules/actions/menu";
import { setAppState } from "../../modules/actions/appInfo";

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

type joinMethodParams = {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  adminPwd: string;
  nickname: string;
  profileImgIdx: number | null;
};

type uploadFileMethodParams = {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
  adminPwd: string;
  nickname: string;
  imageFile: File | Blob | null;
};

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
      document.title = "DEVELOPBLOG-로그인";
    } else {
      document.title = "DEVELOPBLOG-회원가입";
    }
  }, [type]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(changeField({ form: type, key: name, value }));
  };
  const onChangeImg = (data: File | Blob) => {
    dispatch(changeField({ form: type, key: "imageFile", value: data }));
  };
  const onCheckAdmin = (value: boolean) => {
    dispatch(changeField({ form: "joinForm", key: "isAdmin", value }));
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type == "joinForm") {
      const {
        email,
        pwd,
        pwdCheck,
        name,
        isAdmin,
        adminPwd,
        nickname,
        imageFile,
      } = joinForm;
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
      if (email == "") {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (pwd == "") {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      _login(email, pwd);
    }
  };

  const __uploadImageFile = async (props: uploadFileMethodParams) => {
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

  const _join = async (props: joinMethodParams) => {
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
      const result = await dispatch(
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
      console.log("AuthTemplate _join error: ", err);
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
      console.log("AuthTemplate _login result: ", result);
      if (result.data?.backgroundImg) {
        dispatch(
          setAppState({
            key: "backgroundImg",
            value: result.data.backgroundImg.publishedUrl,
          })
        );
      }
      navigate("/");
    } catch (e: any) {
      console.log("AuthTemplate _login error: ", e.response);
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
