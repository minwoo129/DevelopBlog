import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { SecondHeader, StyledTitle } from "./AdditionalComponent";

const ContentViewBlock = styled.div`
  flex: 1;
  display: flex;
  min-width: 568px;
  flex-direction: column;
  padding: 0 2rem;
  @media (min-width: 906px) {
    margin: 0 50px;
  }
  @media (min-width: 1000px) {
    margin: 0 100px;
  }
`;

interface ContentViewProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
}

const ContentView: FC<ContentViewProps> = ({ blog, ...props }) => {
  console.log("blog: ", blog);
  return (
    <ContentViewBlock>
      <StyledTitle>{blog?.title ?? ""}</StyledTitle>
      <SecondHeader
        blog={blog}
        onPressDelete={() => {}}
        onPressRevise={() => {}}
      />
      {blog && <Viewer initialValue={blog?.content ?? ""} />}
    </ContentViewBlock>
  );
};

export default ContentView;
