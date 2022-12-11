import React, { FC, HTMLAttributes, useEffect } from "react";
import { useDispatch } from "react-redux";
import MenuTemplate from "../components/menu/MenuTemplate";
import MyPageTemplate from "../components/myPage/MyPageTemplate";
import { getUserInfoThunk } from "../modules/thunk/appInfo";

const MyPage = ({}) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    _getUserInfo();
  }, []);

  const _getUserInfo = async () => {
    try {
      const result = await dispatch(getUserInfoThunk({}));
      console.log("MyPage _getUserInfo result: ", result);
    } catch (err) {
      console.log("MyPage _getUserInfo error: ", err);
    }
  };

  return (
    <MenuTemplate>
      <MyPageTemplate />
    </MenuTemplate>
  );
};

export default MyPage;
