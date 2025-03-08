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
import { updateProfileImage, updateUser } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const [name, setname] = useState<string>(session?.user.name || "");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleImageChange = async () => {
    const file = fileRef.current?.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profileImage", file);
      const image = await updateProfileImage(formData);
      void update({
        profileImage: image,
        name: session?.user.name,
        email: session?.user.email,
      });
      router.push("/admin");
      router.refresh();
    }
  };
  const handleImageClick = () => {
    fileRef.current?.click();
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = await updateUser(name);
    console.log("user", name);

    void update({
      name: newName,
      email: session?.user.email,
      profileImage: session?.user.profileImage,
    });
    router.push("/admin");
    router.refresh();
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
            <input type="hidden" name="id" id="id" value={session?.user.id} />
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              name="profileImage"
              className="hidden"
              ref={fileRef}
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <Image
                src={imagePreview}
                fill
                alt={`user`}
                className="rounded-full object-cover"
                onClick={handleImageClick}
              />
            ) : (
              <Image
                src={session?.user.profileImage || ""}
                fill
                alt={`user`}
                className="rounded-full border object-cover"
                onClick={handleImageClick}
              />
            )}
          </div>
          <div>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              onChange={(e) => setname(e.currentTarget.value)}
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
