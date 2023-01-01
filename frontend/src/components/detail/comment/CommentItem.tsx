import React, { FC, HTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { CommentType } from "../../../modules/initialStates/initialStateType";
import { DefaultUserImage } from "../../../common/UserImage";
import moment from "moment";
import "moment/locale/ko";
import { CommentItemProps } from "../DetailType";

const CommentItemBlock = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #585858;
`;

const UserInfoGrid = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
`;

const UserImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
`;

const UserInfo = styled.div`
  height: 3rem;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const UserName = styled.div`
  font-size: 1.2rem;
`;
const UserCreatedAt = styled.div`
  font-size: 1rem;
`;
const CommentTxt = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  display: block;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MINUTES_OF_A_HOUR = 60;
const MINUTES_OF_A_DAY = MINUTES_OF_A_HOUR * 24;
const MINUTES_OF_A_WEEK = MINUTES_OF_A_DAY * 7;

const CommentItem: FC<CommentItemProps> = ({ comment, ...props }) => {
  const createdAt = useMemo(() => {
    let createdAt = "";
    const createDate = moment(comment.createdAt);
    const nowDate = moment();
    const timeDiffByMinute = nowDate.diff(createDate, "minutes");
    if (timeDiffByMinute >= MINUTES_OF_A_WEEK) {
      createdAt = createDate.format("LL");
    } else if (timeDiffByMinute >= 1) {
      createdAt = createDate.startOf("hour").fromNow();
    } else {
      createdAt = "방금 전";
    }

    return createdAt;
  }, []);
  return (
    <CommentItemBlock {...props}>
      <UserInfoGrid>
        {comment.User.profileImgUrl ? (
          <UserImg src={comment.User.profileImgUrl} />
        ) : (
          <DefaultUserImage
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "3rem",
            }}
            iconDetailStyle={{ width: "1.5rem", height: "1.5rem" }}
          />
        )}

        <UserInfo>
          <UserName>{comment.User.nickname}</UserName>
          <UserCreatedAt>{createdAt}</UserCreatedAt>
        </UserInfo>
      </UserInfoGrid>
      <CommentTxt>{comment.comment}</CommentTxt>
    </CommentItemBlock>
  );
};

export default CommentItem;
