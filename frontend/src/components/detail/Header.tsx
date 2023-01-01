import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderProps } from "./DetailType";

const HeaderBlock = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header: FC<HeaderProps> = ({ isMenuVisible, setMenuOpen, ...props }) => {
  return (
    <HeaderBlock {...props}>
      {!isMenuVisible && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge={false}
          onClick={setMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      )}
    </HeaderBlock>
  );
};

export default Header;
