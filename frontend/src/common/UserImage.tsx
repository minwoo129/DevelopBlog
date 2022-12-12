import React, { FC, HTMLAttributes } from "react";
import styled, { CSSProperties } from "styled-components";
import { AiOutlineUser } from "react-icons/ai";

const DefaultUserImageBlock = styled.div`
  background: #bdbdbd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

interface DefaultUserImageProps extends HTMLAttributes<HTMLDivElement> {
  iconDetailStyle?: CSSProperties;
}

export const DefaultUserImage: FC<DefaultUserImageProps> = ({
  iconDetailStyle,
  ...props
}) => {
  return (
    <DefaultUserImageBlock {...props}>
      <AiOutlineUser style={iconDetailStyle} />
    </DefaultUserImageBlock>
  );
};

export const UserImg = styled.img`
  background: #bdbdbd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  object-fit: cover;
`;
