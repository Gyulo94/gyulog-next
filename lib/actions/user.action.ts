"use server";

import { signIn } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect-error";
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

// export const updateUser = async (name: string) => {
//   const session = await auth();
//   if (!session) {
//     throw new Error("No session found");
//   }
//   const response = await fetch(`${BASE_URL}/user/${session.user.email}`, {
//     method: "PATCH",
//     body: JSON.stringify({ name }),
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${session.backendTokens.access_token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to update user");
//   }
//   const result = await response.json();
//   return result.name;
// };

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
