import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";

const ContentViewBlock = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid orange;
  margin: 0 100px;
  min-width: 568px;
`;

interface ContentViewProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
}

const ContentView: FC<ContentViewProps> = (props) => {
  return <ContentViewBlock></ContentViewBlock>;
};

export default ContentView;
