"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="absolute top-0 left-0 z-10 flex justify-center items-center min-h-screen w-full bg-white dark:bg-[#020817]">
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center mb-2 pt-10 pb-5">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt={`${APP_NAME} logo`}
                priority={true}
              />
            </Link>
            <CardTitle className="text-center text-2xl">404</CardTitle>
            <CardDescription className="text-center text-xl">
              Page Not Found
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
            <p className="text-red-500">페이지를 찾을 수 없습니다!</p>
          </CardContent>
          <CardFooter>
            <Button
              variant={"outline"}
              className="mx-auto"
              onClick={() => (window.location.href = "/")}
            >
              돌아가기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
