import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const ButtonViewBlock = styled.div`
  width: 100%;
  height: 40px;
  border-width: 1px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;
  border: 1px solid black;
`;

const AddButton = styled.button`
  width: 7rem;
  height: 40px;
  background: #04b431;
  border-radius: 6px;
  border: 1px solid #fff;
  color: #fff;
  &:hover {
    background: #01df3a;
  }
`;

interface ButtonViewProps extends HTMLAttributes<HTMLDivElement> {
  onPressAdd(): void;
}

const ButtonView: FC<ButtonViewProps> = ({ onPressAdd, ...props }) => {
  return (
    <ButtonViewBlock {...props}>
      <AddButton onClick={onPressAdd}>등록하기</AddButton>
    </ButtonViewBlock>
  );
};

export default ButtonView;
