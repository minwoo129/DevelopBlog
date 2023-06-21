import React, { ChangeEvent, FC, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setMenuOpen } from "../../modules/actions/menu";
import { RootState } from "../../redux/slice";

const SearchBarBlock = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const SearchBarInsideGrid = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  border-radius: 6px;
  padding: 0 1rem;
  border: 1px solid #6e6e6e;
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (min-width: 700px) {
    width: 500px;
  }
  @media (min-width: 1200px) {
    width: 600px;
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
    (state: RootState) => state.Menu.isMenuVisible
  );
  return (
    <SearchBarBlock {...props}>
      <SearchBarInsideGrid>
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
      </SearchBarInsideGrid>
    </SearchBarBlock>
  );
};

export default SearchBar;
