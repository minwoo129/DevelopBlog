import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const LoginTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid green;
  color: green;
`;

interface LoginTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const LoginTemplate: FC<LoginTemplateProps> = (props) => {
  return <LoginTemplateBlock>로그인</LoginTemplateBlock>;
};

export default LoginTemplate;
