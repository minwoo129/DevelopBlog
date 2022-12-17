import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { SecondHeader, StyledTitle } from "./AdditionalComponent";

const ContentViewBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  @media (max-width: 700px) {
    margin: 0;
  }
  @media (min-width: 700px) {
    margin: 0 50px;
  }
  @media (min-width: 1000px) {
    margin: 0 100px;
  }
`;

interface ContentViewProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  onPressDelete(): void;
  onPressRevise(): void;
}

const ContentView: FC<ContentViewProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  ...props
}) => {
  return (
    <ContentViewBlock {...props}>
      <StyledTitle>{blog?.title ?? ""}</StyledTitle>
      <SecondHeader
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
      />
      {blog && <Viewer initialValue={blog?.content ?? ""} />}
    </ContentViewBlock>
  );
};

export default ContentView;
