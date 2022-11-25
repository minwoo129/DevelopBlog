import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/auth";
import "./MenuTemplate.scss";

interface MenuTemplateProps extends HTMLAttributes<HTMLDivElement> {}
const MenuTemplate: FC<MenuTemplateProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginInfo = useSelector((state: any) => state.auth.loginInfo);
  const login = useSelector((state: any) => state.auth.login);

  const onClickTitle = (e: MouseEvent<HTMLDivElement>) => {
    navigate("/");
  };
  const onClickLogin = (e: MouseEvent<HTMLDivElement>) => {
    if (login) {
      dispatch(logout());
      navigate("/");
    } else navigate("/auth/login");
  };
  const onClickWrite = (e: MouseEvent<HTMLDivElement>) => {
    if (login) navigate("/write");
    else navigate("/auth/login");
  };

  return (
    <div className="menuTemplate">
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
      {props.children}
    </div>
  );
};

export default MenuTemplate;
