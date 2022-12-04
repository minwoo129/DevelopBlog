import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const HeaderBlock = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header: FC<HeaderProps> = (props) => {
  return <HeaderBlock></HeaderBlock>;
};

export default Header;
