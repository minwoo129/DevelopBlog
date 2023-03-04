import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { setSearchTxt } from "../modules/actions/appInfo";
import { clearSearchBlogs } from "../modules/actions/blog";

const MainPage = ({}) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    document.title = "DEVLOG";
    batch(() => {
      dispatch(clearSearchBlogs());
      dispatch(setSearchTxt(""));
    });
  }, []);

  return (
    <MenuTemplate>
      <ListTemplate />
    </MenuTemplate>
  );
};

export default MainPage;
