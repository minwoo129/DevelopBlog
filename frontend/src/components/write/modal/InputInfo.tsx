import React, {
  ChangeEvent,
  CSSProperties,
  FC,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdPublic } from "react-icons/md";
import { BiLock } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { invokeFileUpload } from "../../../lib/restAPI";
import {
  FooterBtn,
  ImageView,
  PublicAskBtnGrid,
  PublicBtn,
  PublicTitle,
  SaveBtnsGrid,
  StyledFileInput,
  StyledFileUploadBtn,
  StyledImg,
} from "./AdditionalComponent";
import { isActiveInServer } from "../../../config";
import { WritePostModalInputInfoBlock } from "../StyledComponents";
import { WritePostModalInputInfoProps } from "../../../pages/WritePost/PageTypes";

const override: CSSProperties = {
  position: "absolute",
};

const InputInfo: FC<WritePostModalInputInfoProps> = ({
  thumbnailUrl,
  setThumbnailUrl,
  isPublic,
  setPublic,
  close,
  addBlog,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const { publicBtnColor, unPublicBtnColor } = useMemo(() => {
    let publicBtnColor = "#01DF3A",
      unPublicBtnColor = "#BDBDBD";

    if (!isPublic) {
      publicBtnColor = "#BDBDBD";
      unPublicBtnColor = "#01DF3A";
    }

    return { publicBtnColor, unPublicBtnColor };
  }, [isPublic]);
  const { closeBtnColor, saveBtnColor } = useMemo(() => {
    let closeBtnColor = "#FA5858",
      saveBtnColor = "#0080FF";
    return { closeBtnColor, saveBtnColor };
  }, []);

  const __uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setLoading(true);
    const file = e.target.files[0];

    try {
      const result = await invokeFileUpload({
        path: "/api/files/upload",
        data: file,
        uploadType: "image/content",
      });
      setThumbnailUrl(result.data.data.publishedUrl);
    } catch (err) {
      !isActiveInServer && console.log("InputInfo __uploadFile error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const onPressUploadBtn = () => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  };
  return (
    <WritePostModalInputInfoBlock {...props}>
      <StyledFileInput
        type="file"
        ref={inputRef}
        src={thumbnailUrl}
        onChange={__uploadFile}
        style={{ display: "none" }}
      />
      <ImageView>
        <StyledImg src={thumbnailUrl} />
        <ClipLoader color="#0101DF" cssOverride={override} loading={loading} />
      </ImageView>
      <StyledFileUploadBtn onClick={onPressUploadBtn}>
        이미지 변경
      </StyledFileUploadBtn>
      <PublicTitle>공개여부 설정</PublicTitle>
      <PublicAskBtnGrid>
        <PublicBtn
          style={{ borderColor: publicBtnColor, color: publicBtnColor }}
          onClick={() => setPublic(true)}
        >
          <MdPublic style={{ fontSize: "1rem", marginRight: "0.25rem" }} />
          공개
        </PublicBtn>
        <PublicBtn
          style={{ borderColor: unPublicBtnColor, color: unPublicBtnColor }}
          onClick={() => setPublic(false)}
        >
          <BiLock style={{ fontSize: "1rem", marginRight: "0.25rem" }} />
          비공개
        </PublicBtn>
      </PublicAskBtnGrid>

      <SaveBtnsGrid>
        <FooterBtn
          style={{ borderColor: closeBtnColor, color: closeBtnColor }}
          onClick={close}
        >
          닫기
        </FooterBtn>
        <FooterBtn
          style={{ borderColor: saveBtnColor, color: saveBtnColor }}
          onClick={addBlog}
        >
          등록하기
        </FooterBtn>
      </SaveBtnsGrid>
    </WritePostModalInputInfoBlock>
  );
};

export default InputInfo;
