import React, { FC, HTMLAttributes, MouseEvent } from "react";
import styled from "styled-components";

const HeaderBlock = styled.div`
  flex: 1;
  height: 48px;
  border: 1px solid red;
  padding: 4px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderInput = styled.input`
  width: 60%;
  height: 100%;
  border: 1px solid orange;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 1rem;
`;

const HeaderSubmitBtn = styled.button`
  width: 100px;
  height: 100%;
  background: #084b8a;
  border-radius: 6px;
  border: 1px solid white;
  color: white;
  &:hover {
    background: #0080ff;
  }
`;

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  setTitle(value: string): void;
  onClick(): void;
}

const Header: FC<HeaderProps> = ({ title, setTitle, onClick }) => {
  const pressButton = (e: MouseEvent<HTMLButtonElement>) => {};
  return (
    <HeaderBlock>
      <HeaderInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      />
      <HeaderSubmitBtn onClick={onClick}>등록하기</HeaderSubmitBtn>
    </HeaderBlock>
  );
};

export default Header;
