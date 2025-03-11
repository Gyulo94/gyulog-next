import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
// import { getSession } from "@/lib/session";
import { getServerAuthSession } from "@/lib/auth";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./Login-form";

export const metadata: Metadata = {
  title: "Login",
};

const SignIn = async () => {
  const session = await getServerAuthSession();
  if (session && session.user) redirect("/admin");
  return (
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
          <CardTitle className="text-center text-2xl">GYULOG</CardTitle>
          <CardDescription className="text-center text-md">
            어드민 로그인
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
