import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../modules/actions/auth";
import { RootState } from "../../modules/reducer";
import "./MenuTemplate.scss";
import { setMenuOpen, setMenuVisible } from "../../modules/actions/menu";
import { Drawer } from "@mui/material";
import { tokenCheckThunk } from "../../modules/thunk/auth";
import { getCookies } from "../../lib/restAPI";
import { batch } from "react-redux";
import {
  clearDataWhenLogout,
  clearReviseData,
  setAppState,
} from "../../modules/actions/appInfo";

interface MenuTemplateProps extends HTMLAttributes<HTMLDivElement> {}
const MenuTemplate: FC<MenuTemplateProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo);
  const login = useSelector((state: RootState) => state.auth.login);
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);
  const isReviseUserInfo = useSelector(
    (state: RootState) => state.appInfo.isReviseUserInfo
  );
  const [isMyPage, setMyPage] = useState<boolean>(false);

  useEffect(() => {
    if (!login) {
      const cookie = getCookies("access_token");
      if (cookie) _tokenCheck();
    }
  }, []);
  useEffect(() => {
    const resizeEvent = () => {
      if (window.innerWidth >= 906) {
        if (!isMenuVisible) {
          dispatch(setMenuVisible(true));
          dispatch(setMenuOpen(false));
        }
      } else {
        if (isMenuVisible) dispatch(setMenuVisible(false));
      }
    };

    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [isMenuVisible]);
  useEffect(() => {
    if (location.pathname.indexOf("/myPage") != -1) setMyPage(true);
    else setMyPage(false);
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
  const onClickLogin = (e: MouseEvent<HTMLDivElement>) => {
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
      dispatch(logout());
      dispatch(clearDataWhenLogout());
      navigate("/");
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
      const result = await dispatch(tokenCheckThunk({}));
      navigate("/write");
      if (result.data?.backgroundImg) {
        dispatch(
          setAppState({
            key: "backgroundImgSrc",
            value: result.data?.backgroundImg.publishedUrl,
          })
        );
      }
    } catch (err) {
      console.log("MainPage _tokenCheck error: ", err);
      const isMoveToLogin = window.confirm(
        "사용자 정보를 확인할 수 없습니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (isMoveToLogin) navigate("/auth/login");
    }
  };
  const _tokenCheck = async () => {
    try {
      const result = await dispatch(tokenCheckThunk({}));
      if (result.data?.backgroundImg) {
        dispatch(
          setAppState({
            key: "backgroundImgSrc",
            value: result.data?.backgroundImg.publishedUrl,
          })
        );
      }
    } catch (e) {
      console.log("MainPage _tokenCheck error: ", e);
    }
  };

  return (
    <div className="menuTemplate">
      {isMenuVisible ? (
        <div className="menuBar">
          <div className="menuTitle" onClick={onClickTitle}>
            <h3>DEVBLOG</h3>
          </div>
          {login && (
            <div
              className="loginInfo"
              onClick={onClickUser}
            >{`${loginInfo.name}님, 반갑습니다.`}</div>
          )}
          <div className="menuItem" onClick={onClickLogin}>
            <h3>{login ? "로그아웃" : "로그인"}</h3>
          </div>
          <div className="menuItem" onClick={onClickWrite}>
            <h3>글쓰기</h3>
          </div>
        </div>
      ) : (
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
          <div
            style={{ background: "#424242", width: "10rem", height: "100%" }}
          >
            <div
              onClick={onClickTitle}
              style={{
                width: "100%",
                height: "10rem",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #fff",
                display: "flex",
              }}
            >
              <h3 style={{ color: "orange", fontSize: "1.5rem" }}>DEVBLOG</h3>
            </div>
            {login && (
              <div
                style={{
                  width: "100%",
                  height: "5rem",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid #fff",
                  display: "flex",
                  color: "orange",
                  fontWeight: "bold",
                }}
                onClick={onClickUser}
              >{`${loginInfo.name}님\n반갑습니다.`}</div>
            )}
            <div
              onClick={onClickLogin}
              style={{
                width: "100%",
                height: "5rem",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #fff",
                display: "flex",
              }}
            >
              <h3 style={{ color: "orange", fontSize: "1rem" }}>
                {login ? "로그아웃" : "로그인"}
              </h3>
            </div>
            <div
              onClick={onClickWrite}
              style={{
                width: "100%",
                height: "5rem",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #fff",
                display: "flex",
              }}
            >
              <h3 style={{ color: "orange", fontSize: "1rem" }}>글쓰기</h3>
            </div>
          </div>
        </Drawer>
      )}
      {props.children}
    </div>
  );
};

export default MenuTemplate;
