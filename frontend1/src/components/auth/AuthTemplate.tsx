import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import qs from "qs";
import { useLocation } from "react-router-dom";

const AuthTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid green;
  color: green;
  background: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface AuthTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log("location: ", location);
  console.log("query: ", query);
  return <AuthTemplateBlock>로그인</AuthTemplateBlock>;
};

export default AuthTemplate;
