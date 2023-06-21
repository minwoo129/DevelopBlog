import React, { FC, HTMLAttributes, useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { clearSearchBlogs } from "../redux/slice/Blog";
import { setSearchTxt } from "../redux/slice/AppInfo";

interface ListPageProps extends HTMLAttributes<HTMLDivElement> {}

const ListPage: FC<ListPageProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    document.title = "DEVLOG";
    batch(() => {
      dispatch(clearSearchBlogs());
      dispatch(setSearchTxt(""));
    });
  }, []);
  return (
    <MenuTemplate {...props}>
      <ListTemplate />
    </MenuTemplate>
  );
};

export default ListPage;
