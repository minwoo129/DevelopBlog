import React from "react";
import styled from "styled-components";

export const StyledImage = styled.img`
  border-radius: 6px;
  margin-right: 25px;
  object-fit: cover;
  @media (max-width: 1180px) {
    width: 100%;
  }
  @media (min-width: 1180px) {
    width: 300px;
    height: 200px;
  }
`;

export const ItemInformationView = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 1180px) {
    height: 150px;
  }
  @media (min-width: 1180px) {
    height: 200px;
  }
`;

export const StyledTitle = styled.h1`
  display: inline-block;
  width: 400px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidded;
`;

export const StyledContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  @media (max-width: 1180px) {
    max-height: 150px;
  }
  @media (min-width: 1180px) {
    height: 3.6;
  }
  margin-top: -0.5rem;
  width: 400px;
`;

export const StyledCreatedAt = styled.p`
  font-size: 1rem;
  color: #848484;
  margin-top: -0.7rem;
`;
