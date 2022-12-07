import React, { ChangeEvent, FC, HTMLAttributes } from "react";
import styled from "styled-components";

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
    width: 70%;
  }
  @media (min-width: 768px) {
    width: 80%;
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
  return (
    <SearchBarBlock {...props}>
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
