import React, { FC, HTMLAttributes, useEffect } from "react";
import { batch } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuTemplate from "../components/menu/MenuTemplate";
import MyPageTemplate from "../components/myPage/MyPageTemplate";
import { RootState } from "../modules/reducer";
import {
  getUserInfoThunk,
  getUserWriteBlogsThunk,
} from "../modules/thunk/appInfo";

const MyPage = ({}) => {
  const dispatch = useDispatch<any>();

  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo);

  useEffect(() => {
    batch(() => {
      _getUserInfo();
      _getUserWriteBlogs();
    });
  }, []);

  const _getUserInfo = async () => {
    try {
      const result = await dispatch(getUserInfoThunk({}));
    } catch (err) {
      console.log("MyPage _getUserInfo error: ", err);
    }
  };

  const _getUserWriteBlogs = async () => {
    try {
      const result = await dispatch(
        getUserWriteBlogsThunk({
          params: {
            page: 1,
            size: 20,
          },
        })
      );
    } catch (err) {
      console.log("MyPage _getUserWriteBlogs error: ", err);
    }
  };

  return (
    <MenuTemplate>
      <MyPageTemplate />
    </MenuTemplate>
  );
};

export default MyPage;
