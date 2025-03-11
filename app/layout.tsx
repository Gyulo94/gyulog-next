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
    default: APP_NAME as string,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL("https://gyulog.vercel.app"),
  openGraph: {
    title: {
      template: `%s | Gyulog`,
      default: APP_NAME as string,
    },
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    // url: "https://gyulog.vercel.app",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
        alt: APP_NAME,
      },
    ],
  },
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
