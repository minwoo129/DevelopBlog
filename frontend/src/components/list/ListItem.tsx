import React, { FC, HTMLAttributes } from "react";
import styled, {
  css,
  DefaultTheme,
  ThemedCssFunction,
} from "styled-components";

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

const ListItemBlock = styled.div`
  border: 1px solid green;
  border-radius: 6px;
  margin-top: 25px;
  margin-bottom: 25px;
  @media (max-width: 1270px) {
    width: 500px;
    background: orange;
    height: 300px;
    display: block;
    img {
      width: 250px;
      height: 150px;
    }
  }
  @media (min-width: 1270px) {
    width: 500px;
    background: yellow;
    height: 300px;
    display: inline-block;
    img {
      width: 300px;
      height: 150px;
    }
  }
  @media (min-width: 1550px) {
    width: 40%;
    background: red;
    height: 300px;
    display: inline-block;
    img {
      width: 250px;
      height: 150px;
    }
  }
`;

const ListItem: FC<ListItemProps> = (props) => {
  return (
    <ListItemBlock>
      <img src="https://developblog.s3.ap-northeast-2.amazonaws.com/image/default/2022/1203/93eb6dd6-8a7a-41ad-93fd-616795fa4bae" />
    </ListItemBlock>
  );
};

export default ListItem;
