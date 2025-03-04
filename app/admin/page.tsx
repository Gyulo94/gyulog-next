import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/admin/login");
  return (
    // <div>
    //   <p>
    //     <span>{session.user.name}</span>님, 안녕하세요!
    //   </p>
    //   <p>오늘도 좋은 하루 되세요 !</p>
    //   <div className="flex flex-col space-y-4">
    //     <Button asChild>
    //       <Link href={`/admin/posts`}>글 작성</Link>
    //     </Button>
    //     <Button>
    //       <Link href={`/admin/logout`}>로그아웃</Link>
    //     </Button>
    //   </div>
    // </div>
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex justify-center mb-2">
            <Image
              src="/images/logo.png"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
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
              <Link href={`/admin/posts`}>글 작성</Link>
            </Button>
            <Button>
              <Link href={`/admin/logout`}>로그아웃</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
