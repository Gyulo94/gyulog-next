"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Header from "../shared/Header";
import { ThemeProvider } from "./theme-provider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
