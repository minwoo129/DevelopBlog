import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineSearch } from "react-icons/hi";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/slice";
import { setMenuOpen } from "../../redux/slice/Menu";

const HeaderBlock = styled.div`
  width: 100%;
  height: 3rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

const Header: FC<HeaderProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMenuVisible = useSelector(
    (state: RootState) => state.Menu.isMenuVisible
  );
  const searchBarVisible = useSelector(
    (state: RootState) => state.AppInfo.searchBarVisible
  );

  const onClickSearch = () => {
    navigate("/search");
  };

  return (
    <HeaderBlock {...props}>
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
    </HeaderBlock>
  );
};

export default Header;
