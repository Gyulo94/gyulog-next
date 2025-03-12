import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerAuthSession();
  if (!session || !session.user) redirect("/admin/login");
  console.log("session", session);
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4 flex justify-center items-center">
          <div className="flex justify-center items-center h-28 w-28 relative mb-2">
            <img
              src={session.user.profileImage || ""}
              alt={`user`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <CardTitle className="text-center text-2xl">
            관계자 외 출입금지
          </CardTitle>
          <CardDescription className="text-center text-md">
            어드민 페이지
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>
            <span>{session.user.name}</span>님, 안녕하세요!
          </p>
          <p>오늘도 좋은 하루 되세요 !</p>
          <div className="flex flex-col space-y-4">
            <Button asChild>
              <Link href={`/admin/write`}>글 작성</Link>
            </Button>
            <Button asChild>
              <Link href={`/admin/profile`}>프로필</Link>
            </Button>
            <Button asChild>
              <Link href={`/admin/logout`}>로그아웃</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
