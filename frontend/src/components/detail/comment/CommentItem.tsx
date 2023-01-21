import React, { FC, HTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { CommentType } from "../../../modules/initialStates/initialStateType";
import { DefaultUserImage } from "../../../common/UserImage";
import moment from "moment";
import "moment/locale/ko";
import {
  CommentInputStyledButtonProps,
  CommentItemImageViewProps,
  CommentItemProps,
} from "../DetailType";

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
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const InformationGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FunctionBtnGridBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-self: flex-end;
`;

const StyledButtonBlock = styled.button`
  color: #424242;
  margin-right: 0.5rem;
  font-size: small;
  border-width: 0;
  &:hover {
    color: #848484;
  }
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

const CommentItemImageView: FC<CommentItemImageViewProps> = ({ user }) => {
  if (!user.profileImgUrl) {
    return (
      <DefaultUserImage
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "3rem",
        }}
        iconDetailStyle={{ width: "1.5rem", height: "1.5rem" }}
      />
    );
  }

  return <UserImg src={user.profileImgUrl} />;
};

const StyledButton: FC<CommentInputStyledButtonProps> = ({
  visible,
  ...props
}) => {
  if (!visible) return null;
  return <StyledButtonBlock {...props}>{props.children}</StyledButtonBlock>;
};

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
      createdAt = createDate.format("YYYY.MM.DD");
    } else if (timeDiffByMinute >= MINUTES_OF_A_DAY) {
      createdAt = `${nowDate.diff(createDate, "days")}일 전`;
    } else if (timeDiffByMinute >= 60) {
      createdAt = `${nowDate.diff(createDate, "hours")}시간 전`;
    } else if (timeDiffByMinute >= 1) {
      createdAt = `${nowDate.diff(createDate, "minutes")}분 전`;
    } else {
      createdAt = "방금 전";
    }

    return createdAt;
  }, []);
  return (
    <CommentItemBlock {...props}>
      <UserInfoGrid>
        <InformationGrid>
          <CommentItemImageView user={comment.User} />

          <UserInfo>
            <UserName>{comment.User.nickname}</UserName>
            <UserCreatedAt>{createdAt}</UserCreatedAt>
          </UserInfo>
        </InformationGrid>

        <FunctionBtnGridBlock>
          <StyledButton visible={comment.enableEdit}>수정</StyledButton>
          <StyledButton visible={comment.enableDelete}>삭제</StyledButton>
        </FunctionBtnGridBlock>
      </UserInfoGrid>
      <CommentTxt>{comment.comment}</CommentTxt>
    </CommentItemBlock>
  );
};

export default CommentItem;
