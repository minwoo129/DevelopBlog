import React, {
  FC,
  HTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  useRef,
} from "react";
import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";
import { DefaultUserImage } from "../../common/UserImage";

const StyledImageInputBlock = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const AddImageButton = styled.button`
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

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #bdbdbd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

interface StyledImageInputProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: any;
  setImgSrc(value: any): void;
  onChangeImg(value: File | Blob): void;
}

const StyledImageInput: FC<StyledImageInputProps> = ({
  imgSrc,
  setImgSrc,
  onChangeImg,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const encodeFileToBase64 = async (fileBlob: Blob) => {
    console.log("file: ", fileBlob);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        onChangeImg(fileBlob);
        setImgSrc(reader.result);
        resolve(null);
      };
    });
  };

  const addImage = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("test");
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };

  return (
    <StyledImageInputBlock {...props}>
      {imgSrc ? (
        <UserImage src={imgSrc} />
      ) : (
        <DefaultUserImage
          style={{ width: "100px", height: "100px", borderRadius: "50px" }}
          iconDetailStyle={{ width: "50px", height: "50px" }}
        />
      )}
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
      <AddImageButton onClick={addImage}>
        <IoMdAdd style={{ width: "1rem", height: "1rem" }} />
      </AddImageButton>
    </StyledImageInputBlock>
  );
};

export default StyledImageInput;
