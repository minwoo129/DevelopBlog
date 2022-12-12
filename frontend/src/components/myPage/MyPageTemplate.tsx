import React, { FC, HTMLAttributes, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { setAppState } from "../../modules/actions/appInfo";
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
  const dispatch = useDispatch<any>();
  const userBlogs = useSelector(
    (state: RootState) => state.appInfo.userWriteBlogs
  );
  const userInfo = useSelector((state: RootState) => state.appInfo.userInfo);
  const isReviseUserInfo = useSelector(
    (state: RootState) => state.appInfo.isReviseUserInfo
  );

  const _setReviseUserInfo = (value: boolean) => {
    dispatch(setAppState({ key: "isReviseUserInfo", value }));
  };

  return (
    <MyPageTemplateBlock {...props}>
      <Header />
      <Body
        userBlogs={userBlogs}
        isRevise={isReviseUserInfo}
        setRevise={_setReviseUserInfo}
        userInfo={userInfo}
      />
    </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;
