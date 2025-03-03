"use client";
import type { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import "@uiw/react-markdown-preview/markdown.css";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const MDViewer = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => {
  const { theme } = useTheme();

  return (
    <div data-color-mode={`${theme === "dark" ? "dark" : "light"}`}>
      <MDViewer {...rest} />
    </div>
  );
};
