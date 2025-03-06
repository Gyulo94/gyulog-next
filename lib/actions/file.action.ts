"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { SERVER_URL } from "../constants";
import { convertToAbsoluteUrl } from "../utils";

export async function uploadImage(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("No session found");
  }
  const response = await fetch(`${SERVER_URL}/file`, {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${session.backendTokens.access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  const result = await response.json();
  return convertToAbsoluteUrl(result.url);
}
