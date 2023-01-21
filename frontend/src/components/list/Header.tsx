import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../../modules/actions/menu";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducer";
import { setSearchbarVisible } from "../../modules/actions/appInfo";
import { useNavigate } from "react-router-dom";
import { HeaderProps } from "./ListTypes";

const HeaderBlock = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderInsideGrid = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
`;

const Header: FC<HeaderProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  const searchBarVisible = useSelector(
    (state: RootState) => state.appInfo.searchBarVisible
  );

  const onClickSearch = () => {
    navigate("/search");
  };

  return (
    <HeaderBlock>
      <HeaderInsideGrid>
        <div style={{ marginLeft: "2rem" }}>
          {!isMenuVisible && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge={false}
              onClick={() => dispatch(setMenuOpen(true))}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <div style={{ marginRight: "2rem" }} onClick={onClickSearch}>
          <HiOutlineSearch style={{ width: "1.5rem", height: "1.5rem" }} />
        </div>
      </HeaderInsideGrid>
    </HeaderBlock>
  );
};

export default Header;
