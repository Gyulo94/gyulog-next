"use server";

import { auth, signIn } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt";
import fs from "fs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import path from "path";
import { LoginFormSchema, SignUpFormSchema } from "../schema";
import { FormState } from "../types";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  try {
    const validationFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validationFields.success) {
      return { error: validationFields.error.flatten().fieldErrors };
    }

    await signIn("credentials", {
      email: validationFields.data.email,
      password: validationFields.data.password,
      redirect: false,
    });
    const user = await prisma.user.findUnique({
      where: { email: validationFields.data.email },
    });
    console.log("user", user);

    return { status: 200, message: `${user?.name}님 안녕하세요!` };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { status: 400, message: "잘못된 이메일 혹은 비밀번호 입니다." };
  }
}

export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const validationFields = SignUpFormSchema.safeParse({
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!validationFields.success) {
      return { error: validationFields.error.flatten().fieldErrors };
    }

    const hashedPassword = await hashSync(validationFields.data.password, 10);
    await prisma.user.create({
      data: {
        email: validationFields.data.email,
        name: validationFields.data.name,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email: validationFields.data.email,
      password: validationFields.data.password,
      redirect: false,
    });
    const userInfo = await prisma.user.findUnique({
      where: { email: validationFields.data.email },
    });

    return { status: 200, message: `${userInfo?.name}님 안녕하세요!` };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { status: 400, message: "잘못된 이메일 혹은 비밀번호 입니다." };
  }
}

export const updateUser = async (name: string, image: string | null) => {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    throw new Error("해당 유저는 존재하지 않습니다.");
  }

  try {
    let imageUrl = session.user.image;

    if (image && !image.startsWith("/profile/")) {
      const fileName = path.basename(image);
      const tempPath = path.join(process.cwd(), "public/temp", fileName);
      const profilePath = path.join(process.cwd(), "public/profile", fileName);

      // console.log("Temp Path:", tempPath);
      // console.log("Profile Path:", profilePath);

      if (!fs.existsSync(tempPath)) {
        // console.error("Temp file does not exist:", tempPath);
        throw new Error("업로드된 파일을 찾을 수 없습니다.");
      }

      const profileDir = path.join(process.cwd(), "public/profile");
      if (!fs.existsSync(profileDir)) {
        // console.log("Creating profile directory:", profileDir);
        fs.mkdirSync(profileDir, { recursive: true });
      }

      if (imageUrl && imageUrl.startsWith("/profile/")) {
        const oldImagePath = path.join(process.cwd(), "public", imageUrl);
        if (fs.existsSync(oldImagePath)) {
          // console.log("Deleting old image:", oldImagePath);
          fs.unlinkSync(oldImagePath);
        }
      }

      fs.renameSync(tempPath, profilePath);

      imageUrl = `/profile/${fileName}`;
    } else if (image && image.startsWith("/profile/")) {
      imageUrl = image;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { name, image: imageUrl },
    });

    // console.log("User updated successfully:", updatedUser);

    return { newName: name, newImage: imageUrl };
  } catch (error) {
    // console.error("Error updating user:", error);
    throw new Error("유저 정보 업데이트에 실패했습니다.");
  }
};
// export async function updateProfileImage(formData: FormData) {
//   const session = await getServerAuthSession();
//   if (!session) {
//     throw new Error("No session found");
//   }

//   const response = await fetch(
//     `${SERVER_URL}/user/profile-image/${session.user.email}`,
//     {
//       method: "PATCH",
//       body: formData,
//       headers: {
//         authorization: `Bearer ${session.backendTokens.access_token}`,
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to upload profileImages");
//   }
//   const result = await response.json();
//   return result.profileImage;
// }
