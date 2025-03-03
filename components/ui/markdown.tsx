"use client";
import type { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDViewer = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => (
  <div>
    <MDViewer {...rest} />
  </div>
);
