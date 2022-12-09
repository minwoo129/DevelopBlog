import React, { FC, HTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";

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
  background: orange;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  border: 1px solid red;
  animation: ${moveAnimation} 0.25s linear 1;
`;

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  setVisible(value: boolean): void;
}

const Modal: FC<ModalProps> = ({ visible, setVisible, ...props }) => {
  if (!visible) return null;
  return <ModalBlock {...props} onClick={() => setVisible(false)}></ModalBlock>;
};

export default Modal;
