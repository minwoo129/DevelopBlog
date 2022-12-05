import React, { FC, HTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { setSearchTxt } from "../../modules/actions/appInfo";
import { RootState } from "../../modules/reducer";
import { getBlogsThunk } from "../../modules/thunk/blog";

const SearchBarBlock = styled.div`
  background-color: #fff;
  display: flex;
  flex: 1;
  max-height: 3rem;
  max-width: 99%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
`;

const StyledInput = styled.input`
  height: 2.5rem;
  border-radius: 6px;
  padding: 0 1rem;
  border: 1px solid #6e6e6e;
  @media (max-width: 768px) {
    width: 400px;
  }
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1400px) {
    width: 80%;
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

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {}

const SearchBar: FC<SearchBarProps> = (props) => {
  const dispatch = useDispatch<any>();

  const searchTxt = useSelector((state: RootState) => state.appInfo.searchTxt);

  return (
    <SearchBarBlock>
      <StyledInput
        value={searchTxt}
        onChange={(e) => {
          dispatch(setSearchTxt(e.target.value));
        }}
        placeholder="검색어를 입력해주세요."
      />

      <SearchBtn>검색하기</SearchBtn>
    </SearchBarBlock>
  );
};

export default SearchBar;
