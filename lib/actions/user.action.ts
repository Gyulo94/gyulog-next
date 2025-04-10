"use server";

import { signIn } from "@/auth";
import { prisma } from "@/db/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LoginFormSchema } from "../schema";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = LoginFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    const userInfo = await prisma.user.findUnique({
      where: { email: user.email },
    });

    return { success: true, message: `${userInfo?.name}님 안녕하세요!` };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "잘못된 이메일 혹은 비밀번호 입니다." };
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
