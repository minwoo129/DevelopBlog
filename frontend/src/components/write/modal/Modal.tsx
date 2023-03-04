import React, { FC } from "react";
import { WritePostModalProps } from "../../../pages/WritePost/PageTypes";
import { WritePostModalBlock } from "../StyledComponents";
import InputInfo from "./InputInfo";

const Modal: FC<WritePostModalProps> = ({
  visible,
  setVisible,
  thumbnailUrl,
  setThumbnailUrl,
  isPublic,
  setPublic,
  addBlog,
  ...props
}) => {
  if (!visible) return null;
  return (
    <WritePostModalBlock {...props}>
      <InputInfo
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        isPublic={isPublic}
        setPublic={setPublic}
        close={() => setVisible(false)}
        addBlog={addBlog}
      />
    </WritePostModalBlock>
  );
};

export default Modal;
