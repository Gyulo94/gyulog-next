import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AdminButton({
  profileImage,
}: {
  profileImage: string;
}) {
  return (
    <Button variant={"ghost"} size={"icon"} asChild>
      <Link href={"/admin"} className="h-6 w-6 relative">
        <Image
          src={profileImage || ""}
          fill
          alt="admin"
          className="rounded-full object-cover"
        />
      </Link>
    </Button>
  );
}
