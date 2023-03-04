import React, { FC } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import { AuthFormFooterProps } from "../../pages/AuthPage/AuthPageTypes";

const FooterBlock = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const Footer: FC<AuthFormFooterProps> = (props) => {
  return <FooterBlock {...props} />;
};

export default Footer;
