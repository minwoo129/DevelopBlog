import React from "react";
import styled from "styled-components";

export const ImageView = styled.div`
  width: 400px;
  height: 200px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImg = styled.img`
  width: 400px;
  height: 200px;
  object-fit: cover;
`;

export const StyledFileInput = styled.input`
  width: 400px;
  height: 200px;
  margin-top: 25px;
`;

export const StyledFileUploadBtn = styled.button`
  width: 400px;
  height: 50px;
  margin-top: 25px;
  border-radius: 6px;
  &:hover {
    color: #01df3a;
    background: #f2f2f2;
  }
  border: 1px solid #01df3a;
  color: #01dfd7;
  background: #fff;
`;

export const StyledTempCloseBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid #fe2e2e;
  border-radius: 6px;
  color: #fe2e2e;
`;

export const PublicAskTitleGrid = styled.div`
  width: 400px;
  border: 1px solid #000;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: -20px 0;
`;

export const PublicAskBtnGrid = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PublicBtn = styled.button`
  width: 180px;
  height: 50px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  &:hover {
    background: #f2f2f2;
  }
  background: #fff;
  border-width: 1px;
  border-style: solid;
`;

export const PublicTitle = styled.h1`
  line-height: 2rem;
  align-self: flex-start;
  margin-left: 50px;
  margin-top: 3rem;
`;

export const SaveBtnsGrid = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-self: end;
  margin-top: 11rem;
`;

export const FooterBtn = styled.button`
  width: 180px;
  height: 50px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  background: #fff;
  &:hover {
    background: #f2f2f2;
  }
  border-width: 1px;
  border-style: solid;
`;
