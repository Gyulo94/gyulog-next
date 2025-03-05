"use client";
import logo from "@/public/images/logo.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminButton from "./admin-button";
import ChatbotButton from "./chatbot-button";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";

export default function Header() {
  const pathname = usePathname();
  const hideHeaderPaths = ["/admin", "/admin/login", "/admin/logout"];
  const { data: session } = useSession();

  if (hideHeaderPaths.includes(pathname)) {
    return null;
  }
  return (
    <header className="w-full border-b z-9">
      <div className="container mx-auto py-4 px-8 h-20 w-full flex justify-between items-center">
        <NavMenu />
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
