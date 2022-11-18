import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import palette from "../../lib/styles/palette";

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

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const Footer = (props: FooterProps) => {
  return <FooterBlock {...props} />;
};

export default Footer;
