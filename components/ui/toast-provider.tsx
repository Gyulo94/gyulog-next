"use client";

import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface Props {
  children: ReactNode;
}

export default function ToastProvider({ children }: Props) {
  const { theme } = useTheme();
  console.log("provider theme", theme);

  return (
    <div>
      {children}
      <ToastContainer theme={theme === "dark" ? "dark" : "light"} />
    </div>
  );
}
