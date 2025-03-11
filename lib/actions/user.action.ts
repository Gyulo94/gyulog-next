"use server";

import { getServerAuthSession } from "../auth";
import { SERVER_URL } from "../constants";
import { FormState, LoginFormSchema } from "../schema";

export async function validateLoginForm(
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  return { data: validationFields.data };
}

export const updateUser = async (name: string) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("No session found");
  }
  const response = await fetch(`${SERVER_URL}/user/${session.user.email}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session.backendTokens.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  const result = await response.json();
  return result.name;
};

export async function updateProfileImage(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("No session found");
  }

  const response = await fetch(
    `${SERVER_URL}/user/profile-image/${session.user.email}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        authorization: `Bearer ${session.backendTokens.access_token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload profileImages");
  }
  const result = await response.json();
  return result.profileImage;
}
