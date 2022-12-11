import React, { FC, HTMLAttributes, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules/reducer";
import Body from "./body/Body";
import Header from "./Header";

const MyPageTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  background: #e9ecef;
  flex-direction: column;
`;

interface MyPageTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const MyPageTemplate: FC<MyPageTemplateProps> = ({ ...props }) => {
  const userBlogs = useSelector(
    (state: RootState) => state.appInfo.userWriteBlogs
  );

  const [isRevise, setRevise] = useState(false);
  return (
    <MyPageTemplateBlock {...props}>
      <Header />
      <Body userBlogs={userBlogs} isRevise={isRevise} setRevise={setRevise} />
    </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;
