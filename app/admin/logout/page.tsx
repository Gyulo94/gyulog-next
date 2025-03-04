"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LogOut = () => {
  const session = getSession();
  if (!session) window.location.href = "/auth/login";

  const onLogout = async () => {
    await signOut();
    window.location.href = "/";
  };
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
            어드민 로그아웃
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col items-center">
          <p className="text-red-500">정말로 로그아웃을 하시겠습니까?</p>
          <Button className="w-full" onClick={onLogout}>
            로그아웃
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogOut;
