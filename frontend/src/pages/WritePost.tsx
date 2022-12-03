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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddedImageIds } from "../modules/actions/blog";

interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

const WritePost: FC<WritePostProps> = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [imageIds, setImageIds] = useState<number[]>([]);
  const ref = useRef<Editor>(null);
  const navigate = useNavigate();

  const onClick = async () => {
    console.log("title: ", title);
    console.log("thumbnailUrl: ", thumbnailUrl);
    console.log("html: ", ref?.current?.getInstance()?.getHTML());
    console.log("ref: ", ref.current?.getInstance()?.getMarkdown());
    console.log("imageIDs: ", imageIds);
    if (title == "") {
      alert("제목을 입력하세요.");
      return;
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
          imageIds,
        },
      });
      navigate("/");
      console.log("WritePost onClick result: ", result);
    } catch (e) {
      console.log("WritePost onClick error: ", e);
    }
  };
  return (
    <div>
      <Header title={title} setTitle={setTitle} onClick={onClick} />
      <Editor
        ref={ref}
        initialValue="당신의 일기를 기록해주세요."
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
              console.log("result: ", result);
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
