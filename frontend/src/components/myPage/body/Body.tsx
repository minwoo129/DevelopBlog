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
  border: 1px solid orange;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  userBlogs: userWriteBlogsType | null;
}

const Body: FC<BodyProps> = ({ userBlogs, ...props }) => {
  return (
    <BodyBlock {...props}>
      <UserInfo />
      <UserDiaryList userBlogs={userBlogs} />
    </BodyBlock>
  );
};

export default Body;
