import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { batch } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuTemplate from "../components/menu/MenuTemplate";
import MyPageTemplate from "../components/myPage/MyPageTemplate";
import { isActiveInServer } from "../config";
import { RootState } from "../modules/reducer";
import { getUserInfoThunk } from "../modules/thunk/appInfo";
import { getUserWriteBlogsThunk } from "../modules/thunk/blog";

const MyPage = ({}) => {
  const dispatch = useDispatch<any>();

  const [page, setPage] = useState(1);

  const loginInfo = useSelector((state: RootState) => state.auth.loginInfo);

  useEffect(() => {
    batch(() => {
      _getUserInfo();
      _getUserWriteBlogs(page);
    });
  }, []);

  const _getUserInfo = async () => {
    try {
      const result = await dispatch(getUserInfoThunk({}));
    } catch (err) {
      !isActiveInServer && console.log("MyPage _getUserInfo error: ", err);
    }
  };

  const _getUserWriteBlogs = async (page: number) => {
    try {
      const result = await dispatch(
        getUserWriteBlogsThunk({
          params: {
            page,
            size: 20,
          },
        })
      );
      setPage(page);
    } catch (err) {
      !isActiveInServer &&
        console.log("MyPage _getUserWriteBlogs error: ", err);
    }
  };

  return (
    <MenuTemplate>
      <MyPageTemplate getUserWriteBlogs={_getUserWriteBlogs} page={page} />
    </MenuTemplate>
  );
};

export default MyPage;
