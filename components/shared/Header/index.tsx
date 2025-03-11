"use client";
import logo from "@/public/images/logo.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminButton from "./admin-button";
import ChatbotButton from "./chatbot-button";
import { MobileMenuButton } from "./mobile-menu-button";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";

export default function Header() {
  const pathname = usePathname();
  const hideHeaderPaths = [
    "/admin",
    "/admin/login",
    "/admin/logout",
    "/admin/profile",
  ];
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (hideHeaderPaths.includes(pathname)) {
    return null;
  }
  return (
    <header className="w-full border-b z-9">
      <div className="container mx-auto py-4 px-8 h-20 w-full flex justify-between items-center">
        {isMobile ? <MobileMenuButton /> : <NavMenu />}

        <Link href={"/"}>
          <Image
            src={logo}
            width={36}
            height={36}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>
        <div className="flex items-center space-x-4">
          {session?.user && (
            <AdminButton profileImage={session.user.profileImage} />
          )}
          <ModeToggle />
          <ChatbotButton />
        </div>
      </div>
    </header>
  );
}
