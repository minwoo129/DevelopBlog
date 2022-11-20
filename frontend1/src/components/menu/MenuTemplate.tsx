import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MenuTemplate.scss";

interface MenuTemplateProps extends HTMLAttributes<HTMLDivElement> {}
const MenuTemplate: FC<MenuTemplateProps> = (props) => {
  const navigate = useNavigate();
  const loginInfo = useSelector((state: any) => state.auth.loginInfo);
  const login = useSelector((state: any) => state.auth.login);
  const onClickTitle = (e: MouseEvent<HTMLDivElement>) => {
    navigate("/");
  };
  const onClickLogin = (e: MouseEvent<HTMLDivElement>) => {
    navigate("/auth/login");
  };
  const onClickMyArticle = (e: MouseEvent<HTMLDivElement>) => {
    navigate("/list");
  };
  const onClickSearch = (e: MouseEvent<HTMLDivElement>) => {
    navigate("/search");
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
        <div className="menuItem" onClick={onClickMyArticle}>
          <h3>내 작성 글</h3>
        </div>
        <div className="menuItem" onClick={onClickSearch}>
          <h3>검색</h3>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default MenuTemplate;
