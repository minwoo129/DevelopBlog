import React, { FC, HTMLAttributes, useEffect } from "react";
import MenuTemplate from "../components/menu/MenuTemplate";
import SearchTemplate from "../components/search/SearchTemplate";

interface SearchPageProps extends HTMLAttributes<HTMLDivElement> {}

const SearchPage: FC<SearchPageProps> = ({ ...props }) => {
  useEffect(() => {
    document.title = "DEVLOG-검색하기";
  }, []);
  return (
    <MenuTemplate {...props}>
      <SearchTemplate />
    </MenuTemplate>
  );
};

export default SearchPage;
