import React, { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import qs from "qs";

type MainPageProp = {};
const Main: FC<MainPageProp> = ({}) => {
  const location = useLocation();
  const param = useParams();

  console.log("Main location: ", location);
  console.log("Main param: ", param);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("Main query: ", query);
  return (
    <div>
      <h1>main</h1>
    </div>
  );
};

export default Main;
