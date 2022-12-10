import React, { FC, HTMLAttributes, useRef } from "react";
import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";
import DefaultUserImage from "../../common/DefaultUserImage";

const StyledImageInputBlock = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddImageButton = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  border: 1px solid #0174df;
  background: #0174df;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  top: 38px;
  right: 30px;
`;

interface StyledImageInputProps extends HTMLAttributes<HTMLDivElement> {}

const StyledImageInput: FC<StyledImageInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const encodeFileToBase64 = async (fileBlob: Blob) => {
    console.log("file: ", fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        console.log("result: ", reader.result);
      };
    });
  };

  /*   const addImage = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }; */
  return (
    <StyledImageInputBlock>
      <DefaultUserImage
        style={{ width: "100px", height: "100px", borderRadius: "50px" }}
        iconDetailStyle={{ width: "50px", height: "50px" }}
      />
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files) {
            return;
          }
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <AddImageButton>
        <IoMdAdd style={{ width: "1rem", height: "1rem" }} />
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            if (!e.target.files) {
              return;
            }
            encodeFileToBase64(e.target.files[0]);
          }}
        />
      </AddImageButton>
    </StyledImageInputBlock>
  );
};

export default StyledImageInput;
