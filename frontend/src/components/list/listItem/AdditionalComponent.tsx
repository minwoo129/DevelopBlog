import React from "react";
import styled from "styled-components";

export const InsideContentGrid = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
`;

export const ContentDetailGrid = styled.div`
  display: inline-block;
  flex: 1;
  padding: 0 1rem;
  width: 250px;
  height: 150px;
`;

export const StyledImg = styled.img`
  width: 250px;
  height: 150px;
  border-radius: 6px;
  object-fit: cover;
`;
export const StyledTitle = styled.h2`
  display: inline-block;
  width: 218px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidded;
`;
export const StyledContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 2.4em;
  margin-top: -0.5rem;
`;
