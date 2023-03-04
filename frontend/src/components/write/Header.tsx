import React, { FC } from "react";
import { WritePostHeaderProps } from "../../pages/WritePost/PageTypes";
import {
  WritePostHeaderBlock,
  WritePostHeaderInput,
  WritePostHeaderSubmitBtn,
} from "./StyledComponents";

const Header: FC<WritePostHeaderProps> = ({ title, setTitle, onClick }) => {
  return (
    <WritePostHeaderBlock>
      <WritePostHeaderInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      />
      <WritePostHeaderSubmitBtn onClick={onClick}>
        등록하기
      </WritePostHeaderSubmitBtn>
    </WritePostHeaderBlock>
  );
};

export default Header;
