import styled, { keyframes } from "styled-components";

export const WritePostHeaderBlock = styled.div`
  flex: 1;
  height: 48px;
  padding: 4px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const WritePostHeaderInput = styled.input`
  width: 60%;
  height: 100%;
  border: 1px solid orange;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 1rem;
`;

export const WritePostHeaderSubmitBtn = styled.button`
  width: 100px;
  height: 100%;
  background: #0080ff;
  border-radius: 6px;
  border: 1px solid white;
  color: white;
  &:hover {
    background: #084b8a;
  }
`;

const moveAnimation = keyframes`
    from {
        top: 100%;
    }
    to {
        top: 0px
    }
`;
export const WritePostModalBlock = styled.div`
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

export const WritePostModalInputInfoBlock = styled.div`
  background: #fff;
  margin: 0 auto;
  border-radius: 6px;
  width: 500px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
