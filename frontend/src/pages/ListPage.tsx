import React, { FC, HTMLAttributes } from "react";
import ListTemplate from "../components/list/ListTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";

interface ListPageProps extends HTMLAttributes<HTMLDivElement> {}

const ListPage: FC<ListPageProps> = (props) => {
  return (
    <MenuTemplate>
      <ListTemplate></ListTemplate>
    </MenuTemplate>
  );
};

export default ListPage;
