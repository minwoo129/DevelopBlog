import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const BodyBlock = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid orange;
  @media (max-width: 906px) {
    margin-top: 150px;
  }
  @media (min-width: 906px) {
    margin: 0 100px;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  return <BodyBlock></BodyBlock>;
};

export default Body;
