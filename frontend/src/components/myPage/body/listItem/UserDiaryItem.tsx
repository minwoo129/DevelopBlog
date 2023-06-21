import React, { FC, HTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { UserDiaryItemProps } from "../../myPageTypes";
import {
  ItemInformationView,
  StyledContent,
  StyledCreatedAt,
  StyledImage,
  StyledTitle,
} from "./AdditionalComponent";

const UserDiaryItemBlock = styled.div`
  margin: 20px 10px;
  border-radius: 6px;
  border: 1px solid #848484;
  display: flex;
  width: 100%;
  background: #e9ecef;
  &:hover {
    background: #d8d8d8;
  }
  padding: 0 25px;
  @media (max-width: 1180px) {
    flex-direction: column;
    padding: 25px 25px;
  }
  @media (min-width: 1180px) {
    height: 250px;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
  }
`;

const UserDiaryItem: FC<UserDiaryItemProps> = ({ item, onPress, ...props }) => {
  let newContent = item.htmlContent.replace(/(<([^>]+)>)/gi, "");
  const createdAt = useMemo(() => {
    let createdAt = "";

    if (item?.createdAt) {
      const [year, month, day] = item.createdAt.split("T")[0].split("-");
      createdAt = `${year}년 ${month}월 ${day}일`;
    }
    return createdAt;
  }, [item]);
  return (
    <UserDiaryItemBlock {...props} onClick={() => onPress(item.id)}>
      <StyledImage src={item.thumbnailUrl} />
      <ItemInformationView>
        <StyledTitle>{item.title}</StyledTitle>
        <StyledContent>{newContent}</StyledContent>
        <StyledCreatedAt>{createdAt}</StyledCreatedAt>
      </ItemInformationView>
    </UserDiaryItemBlock>
  );
};

export default UserDiaryItem;
