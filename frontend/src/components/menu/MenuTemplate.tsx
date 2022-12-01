import React, { FC, HTMLAttributes, MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/actions/auth";
import { RootState } from "../../modules/reducer";
import "./MenuTemplate.scss";
import { setMenuOpen, setMenuVisible } from "../../modules/actions/menu";
import { Drawer } from "@mui/material";

interface MenuTemplateProps extends HTMLAttributes<HTMLDivElement> {}
const MenuTemplate: FC<MenuTemplateProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo);
  const login = useSelector((state: RootState) => state.auth.login);
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);

  useEffect(() => {
    const resizeEvent = () => {
      if (window.innerWidth >= 768) {
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

  const onClickTitle = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(setMenuOpen(false));
    navigate("/");
  };
  const onClickLogin = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(setMenuOpen(false));
    if (login) {
      dispatch(logout());
      navigate("/");
    } else navigate("/auth/login");
  };
  const onClickWrite = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(setMenuOpen(false));
    if (login) navigate("/write");
    else navigate("/auth/login");
  };

  return (
    <div className="menuTemplate">
      {isMenuVisible ? (
        <div className="menuBar">
          <div className="menuTitle" onClick={onClickTitle}>
            <h3>DEVBLOG</h3>
          </div>
          {login && (
            <div className="loginInfo">{`${loginInfo.name}님, 반갑습니다.`}</div>
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
