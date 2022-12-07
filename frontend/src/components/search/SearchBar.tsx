import React, { ChangeEvent, FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules/reducer";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../../modules/actions/menu";

const SearchBarBlock = styled.div`
  background-color: #fff;
  display: flex;
  flex: 1;
  max-height: 3rem;
  max-width: 99%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 906px) {
    padding: 1rem 1rem 1rem 0;
  }
  @media (min-width: 906px) {
    padding: 1rem 1rem;
  }
`;

const StyledInput = styled.input`
  height: 2.5rem;
  border-radius: 6px;
  padding: 0 1rem;
  border: 1px solid #6e6e6e;
  @media (max-width: 906px) {
    width: 60%;
  }
  @media (min-width: 906px) {
    width: 85%;
  }
  @media (min-width: 1400px) {
    width: 90%;
  }
`;
const SearchBtn = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  background: #0080ff;
  border-radius: 6px;
  border: 1px solid white;
  color: white;
  &:hover {
    background: #084b8a;
  }
`;

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {
  searchTxt: string;
  onChangeValue(e: ChangeEvent<HTMLInputElement>): void;
  onPressSearch(): void;
}

const SearchBar: FC<SearchBarProps> = ({
  searchTxt,
  onChangeValue,
  onPressSearch,
  ...props
}) => {
  const dispatch = useDispatch<any>();
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  return (
    <SearchBarBlock {...props}>
      {!isMenuVisible && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge={false}
          onClick={() => dispatch(setMenuOpen(true))}
          style={{ marginLeft: "1rem" }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <StyledInput
        value={searchTxt}
        onChange={onChangeValue}
        placeholder="검색어를 입력해주세요."
      />

      <SearchBtn onClick={onPressSearch}>검색하기</SearchBtn>
    </SearchBarBlock>
  );
};

export default SearchBar;
