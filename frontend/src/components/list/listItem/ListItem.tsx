import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { ListItemProps } from "../ListTypes";
import {
  ContentDetailGrid,
  InsideContentGrid,
  LockedIcon,
  StyledContent,
  StyledImg,
  StyledTitle,
} from "./AdditionalComponent";

const ListItemBlock = styled.div`
  border-radius: 6px;
  width: 300px;
  height: 300px;
  display: block;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.7);
  border: 1px solid grey;
  background: #e9ecef;
  &:hover {
    background: #d8d8d8;
  }
`;

const ListItem: FC<ListItemProps> = ({ blog, onPress, idx, ...props }) => {
  let newContent = blog.htmlContent.replace(/(<([^>]+)>)/gi, "");
  const [marginRight, setMarginRight] = useState(0);

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const resizeEvent = () => {
    if (window.innerWidth >= 1200) {
      setMarginRight(idx % 3 !== 2 ? 150 : 0);
    } else if (window.innerWidth >= 700) {
      setMarginRight(idx % 2 !== 1 ? 100 : 0);
    } else {
      setMarginRight(0);
    }
  };

  return (
    <ListItemBlock
      onClick={(e) => {
        onPress(blog.id);
      }}
      style={{
        marginRight,
      }}
      {...props}
    >
      <LockedIcon isPublic={blog.public} />
      <InsideContentGrid>
        <StyledImg src={blog.thumbnailUrl} />
        <ContentDetailGrid>
          <StyledTitle>{blog.title}</StyledTitle>
          <StyledContent>{newContent}</StyledContent>
          <h6 style={{ color: "#6E6E6E" }}>{blog.User.nickname}</h6>
        </ContentDetailGrid>
      </InsideContentGrid>
    </ListItemBlock>
  );
};

export default ListItem;
