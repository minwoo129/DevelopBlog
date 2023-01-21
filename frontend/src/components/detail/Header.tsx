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
  justify-content: center;
`;

const HeaderInsideGrid = styled.div`
  @media (max-width: 700px) {
    padding: 0;
    min-width: 500px;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 1000px) {
    width: 700px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header: FC<HeaderProps> = ({ isMenuVisible, setMenuOpen, ...props }) => {
  return (
    <HeaderBlock {...props}>
      <HeaderInsideGrid>
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
      </HeaderInsideGrid>
    </HeaderBlock>
  );
};

export default Header;
