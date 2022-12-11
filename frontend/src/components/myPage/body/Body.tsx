import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { userWriteBlogsType } from "../../../modules/initialStates/initialStateType";
import UserDiaryList from "./UserDiaryList";
import UserInfo from "./UserInfo";

const BodyBlock = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  @media (min-width: 906px) {
    margin: 0 100px;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  userBlogs: userWriteBlogsType | null;
  isRevise: boolean;
  setRevise(value: boolean): void;
}

const Body: FC<BodyProps> = ({ userBlogs, isRevise, setRevise, ...props }) => {
  return (
    <BodyBlock {...props}>
      <UserInfo isRevise={isRevise} setRevise={setRevise} />
      <UserDiaryList userBlogs={userBlogs} />
    </BodyBlock>
  );
};

export default Body;
