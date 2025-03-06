"use client";
import { uploadImage } from "@/lib/actions/file.action";
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import "@uiw/react-markdown-preview/markdown.css";
import { commands, ICommand, MDEditorProps } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "highlight.js/styles/github-dark.css";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import rehypeHighlight from "rehype-highlight";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const MDViewer = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: true,
});

const customImageCommand: ICommand = {
  ...commands.image,
  keyCommand: "ctrl-k",
  execute: (state, api) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const imageURL = await uploadImage(formData);
        if (imageURL) {
          const modifyText = `![alt text](${imageURL})`;
          api.replaceSelection(modifyText);
        }
      }
    };
    input.click();
  },
};

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => (
  <div data-color-mode="dark">
    <MDEditor
      {...rest}
      commands={[
        ...commands
          .getCommands()
          .map((cmd) => (cmd.name === "image" ? customImageCommand : cmd)),
      ]}
      previewOptions={{
        rehypePlugins: [rehypeHighlight],
      }}
    />
  </div>
);

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => {
  const { theme } = useTheme();
  return (
    <div data-color-mode={`${theme === "dark" ? "dark" : "light"}`}>
      <MDViewer {...rest} rehypePlugins={[rehypeHighlight]} />
    </div>
  );
};
