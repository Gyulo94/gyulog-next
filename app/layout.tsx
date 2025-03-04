import Providers from "@/components/ui/provider";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: `%s | Gyulog`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={`relative ${pretendard.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
