import React, {
  FC,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import Header from "../components/write/Header";
import invokeAPI, { invokeFileUpload } from "../lib/restAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearchBlogs, setAddedImageIds } from "../modules/actions/blog";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducer";
import { batch } from "react-redux";
import { setSearchTxt } from "../modules/actions/appInfo";
import { clearAddedImageIds } from "../modules/actions/blog";
import Modal from "../components/write/modal/Modal";
import { isActiveInServer } from "../config";

interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

const WritePost: FC<WritePostProps> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const addedImageIds = useSelector(
    (state: RootState) => state.blog.addedImageIds
  );
  const blog = useSelector((state: RootState) => state.blog.blog);
  const isReviseMode = useMemo(() => {
    return location.pathname.indexOf("revise") != -1;
  }, []);

  const [title, setTitle] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(
    "https://developblog.s3.ap-northeast-2.amazonaws.com/image/default/2022/1203/93eb6dd6-8a7a-41ad-93fd-616795fa4bae"
  );
  const [isthumbnailChange, setThumbnailChange] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [isPublic, setPublic] = useState<boolean>(false);
  const ref = useRef<Editor>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "DEVELOPBLOG-작성하기";
    batch(() => {
      dispatch(clearSearchBlogs());
      dispatch(setSearchTxt(""));
    });
    if (isReviseMode) {
      if (blog?.thumbnailUrl) {
        if (blog.thumbnailUrl != thumbnailUrl) setThumbnailChange(true);
        setThumbnailUrl(blog.thumbnailUrl);
      }
      if (blog?.title) setTitle(blog.title);
      if (blog?.public) setPublic(blog.public);
    }
  }, []);

  const onClick = async () => {
    if (title == "") {
      alert("제목을 입력하세요.");
      return;
    }
    setModal(true);
  };

  const __addBlog = async () => {
    let data: any = {
      title,
      content: ref?.current?.getInstance()?.getMarkdown(),
      thumbnailUrl,
      htmlContent: ref.current?.getInstance()?.getHTML(),
      imageIds: addedImageIds,
      public: isPublic,
    };
    if (location.pathname.indexOf("revise") != -1) {
      data = {
        ...data,
        contentId: blog?.id ?? 0,
      };
    }
    try {
      const result = await invokeAPI({
        method: "post",
        path: "/api/content/save",
      })({
        data,
      });
      dispatch(clearAddedImageIds());
      navigate("/");
    } catch (e) {
      !isActiveInServer && console.log("WritePost onClick error: ", e);
    }
  };
  return (
    <div>
      <Header title={title} setTitle={setTitle} onClick={onClick} />
      <Editor
        ref={ref}
        initialValue={
          location.pathname.indexOf("revise") != -1
            ? blog?.content
            : "당신의 일기를 기록해주세요."
        }
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            try {
              const result = await invokeFileUpload({
                data: blob,
                path: "/api/files/upload",
                uploadType: "image/content",
              });
              if (!isthumbnailChange) {
                setThumbnailUrl(result.data.data.publishedUrl);
                setThumbnailChange(true);
              }
              dispatch(setAddedImageIds(result.data.data.id));
              callback(result.data.data.publishedUrl);
            } catch (err) {
              !isActiveInServer && console.log("upload error: ", err);
            }
          },
        }}
      />
      <Modal
        visible={modal}
        setVisible={setModal}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        isPublic={isPublic}
        setPublic={setPublic}
        addBlog={__addBlog}
      />
    </div>
  );
};

export default WritePost;
