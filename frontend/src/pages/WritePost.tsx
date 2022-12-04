import React, { FC, HTMLAttributes, useRef, useState } from "react";
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
import { setAddedImageIds } from "../modules/actions/blog";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducer";

interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

const WritePost: FC<WritePostProps> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const addedImageIds = useSelector(
    (state: RootState) => state.blog.addedImageIds
  );
  const blog = useSelector((state: RootState) => state.blog.blog);

  const [title, setTitle] = useState<string>(
    location.pathname.indexOf("revise") != -1 ? blog?.title ?? "" : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    location.pathname.indexOf("revise") != -1
      ? blog?.thumbnailUrl ?? null
      : null
  );
  const ref = useRef<Editor>(null);
  const navigate = useNavigate();

  const onClick = async () => {
    if (title == "") {
      alert("제목을 입력하세요.");
      return;
    }
    let data: any = {
      title,
      content: ref?.current?.getInstance()?.getMarkdown(),
      thumbnailUrl,
      htmlContent: ref.current?.getInstance()?.getHTML(),
      imageIds: addedImageIds,
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
        data: {
          title,
          content: ref?.current?.getInstance()?.getMarkdown(),
          thumbnailUrl,
          htmlContent: ref.current?.getInstance()?.getHTML(),
          imageIds: addedImageIds,
        },
      });
      navigate("/");
    } catch (e) {
      console.log("WritePost onClick error: ", e);
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
                uploadType: "content",
              });
              if (!thumbnailUrl) {
                setThumbnailUrl(result.data.data.publishedUrl);
              }
              //setImageIds([...imageIds, result.data.data.id]);
              dispatch(setAddedImageIds(result.data.data.id));
              callback(result.data.data.publishedUrl);
            } catch (err) {
              console.log("upload error: ", err);
            }
          },
        }}
      />
    </div>
  );
};

export default WritePost;
