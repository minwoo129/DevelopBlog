import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineSearch } from "react-icons/hi";

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
  return (
    <HeaderBlock>
      <div style={{ marginLeft: "2rem" }}>
        <GiHamburgerMenu style={{ width: "1.5rem", height: "1.5rem" }} />
      </div>
      <div style={{ marginRight: "2rem" }}>
        <HiOutlineSearch style={{ width: "1.5rem", height: "1.5rem" }} />
      </div>
    </HeaderBlock>
  );
};

export default Header;
