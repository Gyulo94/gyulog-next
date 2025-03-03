"use client";
import logo from "@/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import ChatbotButton from "./chatbot-button";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";

export default function Header() {
  return (
    <header className="w-full border-b z-9">
      <div className="container mx-auto py-4 px-8 h-20 w-full flex justify-between items-center">
        <NavMenu />
        <Link href={"/"}>
          <Image
            src={logo}
            width={24}
            height={24}
            alt="logo"
            className="cursor-pointer"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <ChatbotButton />
        </div>
      </div>
    </header>
  );
}
