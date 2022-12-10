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

const DefaultUserImage: FC<DefaultUserImageProps> = ({
  iconDetailStyle,
  ...props
}) => {
  return (
    <DefaultUserImageBlock {...props}>
      <AiOutlineUser style={iconDetailStyle} />
    </DefaultUserImageBlock>
  );
};

export default DefaultUserImage;
