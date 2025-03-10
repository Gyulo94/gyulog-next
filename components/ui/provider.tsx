"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Footer from "../shared/footer";
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
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {children}
        <Toaster />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  );
}
