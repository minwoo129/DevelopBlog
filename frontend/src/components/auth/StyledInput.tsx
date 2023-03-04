import React, { FC } from "react";
import styled from "styled-components";
import { StyledInputProps } from "../../pages/AuthPage/AuthPageTypes";

const StyledInputBlock = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #adb5bd;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #495057;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const StyledInput: FC<StyledInputProps> = (props) => {
  return <StyledInputBlock {...props} />;
};

export default StyledInput;
