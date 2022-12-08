import React, { FC, HTMLAttributes, useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import { setSearchTxt } from "../modules/actions/appInfo";
import { clearSearchBlogs } from "../modules/actions/blog";

interface ListPageProps extends HTMLAttributes<HTMLDivElement> {}

const ListPage: FC<ListPageProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    document.title = "DEVELOPBLOG";
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
