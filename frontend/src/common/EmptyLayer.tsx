import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const EmptyLayerBlock = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

interface EmptyLayerProps extends HTMLAttributes<HTMLDivElement> {
  isSearch: boolean;
  searchText?: string;
}

const EmptyLayer: FC<EmptyLayerProps> = ({
  isSearch,
  searchText = "",
  ...props
}) => {
  return (
    <EmptyLayerBlock {...props}>
      {isSearch ? (
        <h1>{`${searchText}에 대한 검색 결과가 없습니다.`}</h1>
      ) : (
        <h1>아직 등록된 게시글이 없습니다.</h1>
      )}
    </EmptyLayerBlock>
  );
};

export default EmptyLayer;
