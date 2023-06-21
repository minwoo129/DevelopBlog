import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";
import { ListTemplateProps } from "./ListTypes";
import { RootState } from "../../redux/slice";

const ListTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

const ListTemplate: FC<ListTemplateProps> = ({ ...props }) => {
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.AppInfo.backgroundImgSrc
  );
  return (
    <ListTemplateBlock
      {...props}
      style={{
        backgroundImage: `url(${backgroundImgSrc})`,
      }}
    >
      <Header />
      <Body />
    </ListTemplateBlock>
  );
};

export default ListTemplate;
