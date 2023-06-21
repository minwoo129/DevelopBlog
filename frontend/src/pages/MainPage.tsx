import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { clearSearchBlogs } from "../redux/slice/Blog";
import { setSearchTxt } from "../redux/slice/AppInfo";

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
