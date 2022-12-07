import React, { FC, HTMLAttributes } from "react";
import MenuTemplate from "../components/menu/MenuTemplate";
import SearchTemplate from "../components/search/SearchTemplate";

interface SearchPageProps extends HTMLAttributes<HTMLDivElement> {}

const SearchPage: FC<SearchPageProps> = ({ ...props }) => {
  return (
    <MenuTemplate {...props}>
      <SearchTemplate />
    </MenuTemplate>
  );
};

export default SearchPage;
