import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules/reducer";
import Body from "./Body";
import Header from "./Header";

const ListTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = ({ ...props }) => {
  const backgroundImgSrc = useSelector(
    (state: RootState) => state.appInfo.backgroundImgSrc
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
