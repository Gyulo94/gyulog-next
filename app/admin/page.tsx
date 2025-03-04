import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/admin/login");
  console.log("session", session);

  return (
    <div>
      <p>
        <span>{session.user.name}</span>님, 안녕하세요!
      </p>
      <p>오늘도 좋은 하루 되세요 !</p>
      <div className="flex flex-col space-y-4">
        <Button asChild>
          <Link href={`/admin/posts`}>글 작성</Link>
        </Button>
        <Button>
          <Link href={`/admin/logout`}>로그아웃</Link>
        </Button>
      </div>
    </div>
  );
}
