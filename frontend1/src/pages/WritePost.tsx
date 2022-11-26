import React, { FC, HTMLAttributes, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { invokeFileUpload } from "../modules/restAPI";

interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

const WritePost: FC<WritePostProps> = (props) => {
  const ref = useRef<Editor>(null);

  console.log("ref: ", ref.current);
  return (
    <div>
      <Editor
        ref={ref}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }], colorSyntax]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            //AWSFileUpload(blob);
            try {
              const result = await invokeFileUpload({
                data: blob,
                path: "/files/upload",
              });
              console.log("result: ", result);
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
