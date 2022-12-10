import React, { FC, HTMLAttributes } from "react";
import MenuTemplate from "../components/menu/MenuTemplate";
import MyPageTemplate from "../components/myPage/MyPageTemplate";

const MyPage = ({}) => {
  return (
    <MenuTemplate>
      <MyPageTemplate />
    </MenuTemplate>
  );
};

export default MyPage;
