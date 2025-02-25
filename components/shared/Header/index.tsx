import Link from "next/link";
import ChatbotButton from "./chatbot-button";
import { ModeToggle } from "./mode-toggle";
import { NavMenu } from "./nav-menu";

export default function Header() {
  return (
    <header className="container mx-auto py-4 px-8">
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1>Gyulog</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <NavMenu />
          <ModeToggle />
          <ChatbotButton />
        </div>
      </div>
    </header>
  );
}
