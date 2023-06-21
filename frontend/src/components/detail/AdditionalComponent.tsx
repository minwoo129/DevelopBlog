import moment from "moment";
import React, { FC, HTMLAttributes, useMemo } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../redux/state/AdditionalTypes";

// ================================= StyledTitle ===================================
const StyledTitleBlock = styled.h1`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  margin-top: 2rem;
`;

interface StyledTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const StyledTitle: FC<StyledTitleProps> = (props) => {
  return <StyledTitleBlock {...props} />;
};

// ================================= SecondHeader ===================================
const SecondHeaderBlock = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  border: 1px solid #6e6e6e;
  border-radius: 6px;
  margin-top: 2rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
`;

interface SecondHeaderProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  onPressRevise(): void;
  onPressDelete(): void;
}

export const SecondHeader: FC<SecondHeaderProps> = ({
  blog,
  onPressRevise,
  onPressDelete,
  ...props
}) => {
  const { visibleRevise, visibleDelete } = useMemo(() => {
    let visibleRevise = false,
      visibleDelete = false;

    if (blog) {
      visibleRevise = blog.authorization.reviseContent;
      visibleDelete = blog.authorization.deleteContent;
    }

    return { visibleRevise, visibleDelete };
  }, [blog]);
  return (
    <SecondHeaderBlock {...props}>
      <InformationView blog={blog} />
      <FunctionBtnView
        visibleRevise={visibleRevise}
        visibleDelete={visibleDelete}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
      />
    </SecondHeaderBlock>
  );
};

// ================================= InformationView ===================================
const InformationViewBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

interface InformationViewProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
}

const InformationView: FC<InformationViewProps> = ({ blog, ...props }) => {
  const { name, createdAt } = useMemo(() => {
    let name = "",
      createdAt = "";
    name = blog?.User?.nickname ?? "";
    if (blog?.createdAt) {
      const [year, month, day] = moment(blog.createdAt)
        .format("YYYY-MM-DD")
        .split("-");
      createdAt = `${year}년 ${month}월 ${day}일`;
    }
    return { name, createdAt };
  }, [blog]);
  return (
    <InformationViewBlock {...props}>
      <h4 style={{ marginRight: "0.5rem" }}>{name}</h4> ·{" "}
      <p style={{ marginLeft: "0.5rem", color: "#6E6E6E" }}>{createdAt}</p>
    </InformationViewBlock>
  );
};

// ================================= FunctionBtnView ===================================
const FunctionBtnViewBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface FunctionBtnViewProps extends HTMLAttributes<HTMLDivElement> {
  visibleRevise: boolean;
  visibleDelete: boolean;
  onPressRevise(): void;
  onPressDelete(): void;
}

const FunctionBtnView: FC<FunctionBtnViewProps> = ({
  visibleRevise,
  visibleDelete,
  onPressRevise,
  onPressDelete,
  ...props
}) => {
  return (
    <FunctionBtnViewBlock {...props}>
      <StyledButton visible={visibleRevise} onClick={(e) => onPressRevise()}>
        수정
      </StyledButton>
      <StyledButton visible={visibleDelete} onClick={(e) => onPressDelete()}>
        삭제
      </StyledButton>
    </FunctionBtnViewBlock>
  );
};

// ================================= StyledButton ===================================
const StyledButtonBlock = styled.button`
  color: #424242;
  margin-right: 0.5rem;
  font-size: small;
  border-width: 0;
  &:hover {
    color: #848484;
  }
`;

interface StyledButtonProps extends HTMLAttributes<HTMLButtonElement> {
  visible: boolean;
}

const StyledButton: FC<StyledButtonProps> = ({ visible, ...props }) => {
  if (!visible) return null;
  return <StyledButtonBlock {...props}>{props.children}</StyledButtonBlock>;
};
