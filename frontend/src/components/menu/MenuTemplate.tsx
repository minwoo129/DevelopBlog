import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./MenuTemplate.scss";
import { Drawer } from "@mui/material";
import { getCookies } from "../../lib/restAPI";
import { batch } from "react-redux";
import { isActiveInServer } from "../../config";
import { RootState } from "../../redux/slice";
import { clearLoginForm, logout, tokenCheck } from "../../redux/slice/Auth";
import {
  clearDataWhenLogout,
  clearReviseData,
  setAppState,
} from "../../redux/slice/AppInfo";
import { setMenuOpen } from "../../redux/slice/Menu";
import { getBlogs } from "../../redux/slice/Blog";

interface MenuTemplateProps extends HTMLAttributes<HTMLDivElement> {}
const MenuTemplate: FC<MenuTemplateProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const loginInfo = useSelector((state: RootState) => state.Auth.loginInfo);
  const login = useSelector((state: RootState) => state.Auth.login);
  const loginForm = useSelector((state: RootState) => state.Auth.loginForm);
  const isMenuOpen = useSelector((state: RootState) => state.Menu.isMenuOpen);
  const isReviseUserInfo = useSelector(
    (state: RootState) => state.AppInfo.isReviseUserInfo
  );
  const [isMyPage, setMyPage] = useState<boolean>(false);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("access_token");
      if (cookie) _tokenCheck();
    }
  }, []);
  useEffect(() => {
    if (location.pathname.indexOf("/myPage") != -1) setMyPage(true);
    else setMyPage(false);

    if (loginForm.email != "" || loginForm.pwd != "") {
      dispatch(clearLoginForm());
    }
  }, [location]);

  const onClickTitle = (e: MouseEvent<HTMLDivElement>) => {
    if (isMyPage && isReviseUserInfo) {
      const confirmMove = window.confirm(
        "페이지를 이동하시겠습니까?\n현재까지 수정한 데이터가 삭제됩니다."
      );
      if (confirmMove) {
        dispatch(clearReviseData());
      }
    }
    dispatch(setMenuOpen(false));
    navigate("/");
  };
  const onClickUser = (e: MouseEvent<HTMLDivElement>) => {
    if (isMyPage && isReviseUserInfo) {
      const confirmMove = window.confirm(
        "페이지를 이동하시겠습니까?\n현재까지 수정한 데이터가 삭제됩니다."
      );
      if (confirmMove) {
        dispatch(clearReviseData());
      }
    }
    dispatch(setMenuOpen(false));
    navigate("/myPage");
  };
  const onClickLogin = async (e: MouseEvent<HTMLDivElement>) => {
    if (isMyPage && isReviseUserInfo) {
      const confirmMove = window.confirm(
        "페이지를 이동하시겠습니까?\n현재까지 수정한 데이터가 삭제됩니다."
      );
      if (confirmMove) {
        dispatch(clearReviseData());
      }
    }
    dispatch(setMenuOpen(false));
    if (login) {
      await dispatch(logout());
      await dispatch(clearDataWhenLogout());
      await _getBlogs();
    } else navigate("/auth/login");
  };
  const onClickWrite = (e: MouseEvent<HTMLDivElement>) => {
    if (isMyPage && isReviseUserInfo) {
      const confirmMove = window.confirm(
        "페이지를 이동하시겠습니까?\n현재까지 수정한 데이터가 삭제됩니다."
      );
      if (confirmMove) {
        dispatch(clearReviseData());
      }
    }
    dispatch(setMenuOpen(false));
    if (login) _updateToken();
    else navigate("/auth/login");
  };

  const _updateToken = async () => {
    try {
      const result = await dispatch(tokenCheck({}));
      navigate("/write");
      if (result.data?.backgroundImg) {
        dispatch(
          setAppState({
            backgroundImgSrc: result.data?.backgroundImg.publishedUrl,
          })
        );
      }
    } catch (err) {
      !isActiveInServer && console.log("MainPage _tokenCheck error: ", err);
      const isMoveToLogin = window.confirm(
        "사용자 정보를 확인할 수 없습니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (isMoveToLogin) navigate("/auth/login");
    }
  };
  const _tokenCheck = async () => {
    try {
      const result = await dispatch(tokenCheck({}));
      if (result.data?.backgroundImg) {
        dispatch(
          setAppState({
            backgroundImgSrc: result.data?.backgroundImg.publishedUrl,
          })
        );
      }
    } catch (e) {
      !isActiveInServer && console.log("MainPage _tokenCheck error: ", e);
    }
  };

  const _getBlogs = async () => {
    try {
      const result = await dispatch(
        getBlogs({
          params: {
            page: 1,
            size: 20,
          },
        })
      );
      await navigate("/");
    } catch (err) {
      !isActiveInServer && console.log("MainPage _getBlogs error: ", err);
    }
  };

  return (
    <div className="menuTemplate">
      <Drawer
        variant="temporary"
        open={isMenuOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClick={() => {
          dispatch(setMenuOpen(false));
        }}
      >
        <div className="menu">
          <div onClick={onClickTitle} className="logo">
            <h3>DEVLOG</h3>
          </div>
          {login && (
            <div
              className="userInfo"
              onClick={onClickUser}
            >{`${loginInfo.name}님\n반갑습니다.`}</div>
          )}
          <div onClick={onClickLogin} className="menuItem">
            <h3>{login ? "로그아웃" : "로그인"}</h3>
          </div>
          <div onClick={onClickWrite} className="menuItem">
            <h3>글쓰기</h3>
          </div>
        </div>
      </Drawer>
      {props.children}
    </div>
  );
};

export default MenuTemplate;
