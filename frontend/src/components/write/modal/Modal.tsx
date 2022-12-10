import React, { FC, HTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";
import InputInfo from "./InputInfo";

const moveAnimation = keyframes`
    from {
        top: 100%;
    }
    to {
        top: 0px
    }
`;
const ModalBlock = styled.div`
  position: absolute;
  background: #d8d8d8;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  border: 1px solid red;
  animation: ${moveAnimation} 0.25s linear 1;
  justify-content: center;
  align-items: center;
`;

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  setVisible(value: boolean): void;
  thumbnailUrl: string;
  setThumbnailUrl(value: string): void;
  isPublic: boolean;
  setPublic(value: boolean): void;
}

const Modal: FC<ModalProps> = ({
  visible,
  setVisible,
  thumbnailUrl,
  setThumbnailUrl,
  isPublic,
  setPublic,
  ...props
}) => {
  if (!visible) return null;
  return (
    <ModalBlock {...props}>
      <InputInfo
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        isPublic={isPublic}
        setPublic={setPublic}
        close={() => setVisible(false)}
      />
    </ModalBlock>
  );
};

export default Modal;
