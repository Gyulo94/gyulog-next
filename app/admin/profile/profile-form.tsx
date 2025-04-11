"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { uploadImage } from "@/lib/actions/file.action";
import { updateUser } from "@/lib/actions/user.action";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const initializeSession = async () => {
      const session = await getSession();
      if (session?.user) {
        setName(session.user.name || "");
        setImage(session.user.image || "");
      }
    };
    void initializeSession();
  }, []);

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const data = await uploadImage(formData);
      setImage(data);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("Submitting form with:", { name, image });

      // 이미지 값이 없으면 null로 전달
      const newUser = await updateUser(name, image || null);
      const { newName, newImage } = newUser;

      console.log("User updated successfully:", { newName, newImage });

      await update({
        name: newName,
        image: newImage,
      });

      router.push("/admin");
    } catch (error) {
      console.error("Error in onSubmitHandler:", error);
      alert("유저 정보 업데이트에 실패했습니다.");
    }
  };
  return (
    <Card>
      <CardHeader className="space-y-4">
        <CardTitle className="text-center text-2xl">
          관계자 외 출입금지
        </CardTitle>
        <CardDescription className="text-center text-md">
          어드민 프로필
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex justify-center items-center mx-auto h-52 w-52 relative mb-2">
            {image ? (
              <>
                <label
                  htmlFor={"profile"}
                  className="w-[200px] h-[200px] rounded-full border flex items-center justify-center cursor-pointer ml-2"
                >
                  <Image
                    src={image}
                    alt="미리보기"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="cursor-pointer w-[200px] h-[200px] object-cover rounded-full"
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id={"profile"}
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </>
            ) : (
              <>
                <label
                  htmlFor={"profile"}
                  className="w-[200px] h-[200px] rounded-full border flex items-center justify-center cursor-pointer ml-2"
                >
                  <Image
                    src={"/images/noProfileImage.jpg"}
                    alt="미리보기"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="cursor-pointer w-[200px] h-[200px] object-cover rounded-full"
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id={"profile"}
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </>
            )}
          </div>
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              onChange={(e) => setName(e.currentTarget.value)}
              type="text"
              value={name}
            />
          </div>
          <div className="flex flex-col gap-4">
            <SubmitButton className="w-full" variant="default">
              적용
            </SubmitButton>
            <Button className="w-full" variant="outline" onClick={router.back}>
              뒤로
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
