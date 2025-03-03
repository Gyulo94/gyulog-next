import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function ChatbotButton() {
  return (
    <Button variant={"ghost"} size={"icon"}>
      <Icons.bot className="h-6 w-6" />
    </Button>
  );
}
