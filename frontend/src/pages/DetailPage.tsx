import React, { FC, HTMLAttributes } from "react";
import { useLocation } from "react-router-dom";
import DetailTemplate from "../components/detail/DetailTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import qs from "qs";

interface DetailPageProps extends HTMLAttributes<HTMLDivElement> {}

const DetailPage: FC<DetailPageProps> = (props) => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("query: ", query);
  return (
    <MenuTemplate>
      <DetailTemplate />
    </MenuTemplate>
  );
};

export default DetailPage;
