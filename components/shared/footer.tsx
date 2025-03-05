import Image from "next/image";
import Link from "next/link";
import { Icons } from "../ui/icons";

export default function Footer() {
  return (
    // <div className="w-full h-[103px] border relative translate-y-full">
    //   Footer
    // </div>
    <footer className="bg-transparent border-t py-8 mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:flex md:justify-center md:items-center">
          <div className="flex items-center justify-start space-x-8">
            <div className="bg-secondary rounded-full w-max p-5">
              <Image
                src="/images/logo.png"
                alt="Gyulog"
                width={80}
                height={80}
              />
            </div>
            <div>
              <h2 className="font-bold">박철규 / 풀스택 개발자</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                경쟁력있고 소통하는 개발자로 거듭나기 위해, 도전하는 열정으로
                끊임없이 성장하겠습니다.
              </p>
              <div className="flex items-center mt-4 space-x-2">
                <Link
                  href={"mailto:gyulog2025@gmail.com"}
                  className="rounded-md hover:bg-[#1e293b] hover:text-[#f8fafc] w-9 h-9 flex items-center justify-center"
                >
                  <Icons.mail className="w-6 h-6" />
                </Link>
                <Link
                  href={"https://github.com/Gyulo94"}
                  className="rounded-md hover:bg-[#1e293b] hover:text-[#f8fafc] w-9 h-9 flex items-center justify-center"
                >
                  <Icons.gitHub className="w-6 h-6" />
                </Link>
                <Link
                  href={"https://x.com/gyulo94"}
                  className="rounded-md hover:bg-[#1e293b] hover:text-[#f8fafc] w-9 h-9 flex items-center justify-center"
                >
                  <Icons.twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
          &copy; 2025 Gyulog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
