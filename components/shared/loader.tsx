"use client";
import { useTheme } from "next-themes";
import { Ripple } from "react-css-spinners";

export default function Loader() {
  const { theme } = useTheme();
  return (
    <Ripple color={`${theme === "dark" ? "#f8fafc" : "#020817"}`} size={150} />
  );
}
