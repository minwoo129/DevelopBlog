import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { SecondHeader, StyledTitle } from "./AdditionalComponent";
import { ContentViewProps } from "./DetailType";

const ContentViewBlock = styled.div`
  flex: 1;
  display: block;
  flex-direction: column;
  padding: 0 3rem;
  border-bottom: 2px solid #6e6e6e;
  min-height: 800px;
`;

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
