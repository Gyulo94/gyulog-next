import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

export default function ChatbotButton() {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link href={"/chat"}>
        <Icons.bot className="h-6 w-6" />
      </Link>
    </Button>
  );
}
