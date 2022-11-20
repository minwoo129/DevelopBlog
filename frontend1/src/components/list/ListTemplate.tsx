import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import invokeAPI, { getCookies } from "../../modules/restAPI";

const ListTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid orange;
  color: orange;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = (props) => {
  const dispatch = useDispatch<any>();

  const tokenTest = async (e: MouseEvent<HTMLDivElement>) => {
    try {
      const result = await invokeAPI({ method: "get", path: "/token/test" })(
        {}
      );
      console.log("tokenTest result: ", result);
    } catch (e) {
      console.log("tokenTest error: ", e);
    }
  };

  const cookieTest = (e: MouseEvent<HTMLDivElement>) => {
    console.log("cookie: ", getCookies());
  };

  return (
    <ListTemplateBlock>
      <div onClick={cookieTest}>토큰 테스트</div>
    </ListTemplateBlock>
  );
};

export default ListTemplate;
