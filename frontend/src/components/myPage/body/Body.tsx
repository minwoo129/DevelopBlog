import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import UserDiaryList from "./UserDiaryList";
import UserInfo from "./UserInfo";

const BodyBlock = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  @media (min-width: 906px) {
    margin: 0 100px;
  }
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = ({ ...props }) => {
  return (
    <BodyBlock {...props}>
      <UserInfo />
      <UserDiaryList />
    </BodyBlock>
  );
};

export default Body;
