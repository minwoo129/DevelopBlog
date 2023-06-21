import React, { useEffect, useState } from "react";
import { batch } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MenuTemplate from "../components/menu/MenuTemplate";
import MyPageTemplate from "../components/myPage/MyPageTemplate";
import { isActiveInServer } from "../config";
import { RootState } from "../redux/slice";
import { getUserInfo } from "../redux/slice/AppInfo";
import { getUserWriteBlogs } from "../redux/slice/Blog";

const MyPage = ({}) => {
  const dispatch = useDispatch<any>();

  const [page, setPage] = useState(1);

  const loginInfo = useSelector((state: RootState) => state.Auth.loginInfo);

  useEffect(() => {
    batch(() => {
      _getUserInfo();
      _getUserWriteBlogs(page);
    });
  }, []);

  const _getUserInfo = async () => {
    try {
      const result = await dispatch(getUserInfo({}));
    } catch (err) {
      !isActiveInServer && console.log("MyPage _getUserInfo error: ", err);
    }
  };

  const _getUserWriteBlogs = async (page: number) => {
    try {
      const result = await dispatch(
        getUserWriteBlogs({
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
