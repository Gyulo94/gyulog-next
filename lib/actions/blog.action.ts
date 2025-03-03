"use server";

import { SERVER_URL } from "../constants";

export async function findAll(page: number, take: number, title?: string) {
  const params = new URLSearchParams();

  if (page) {
    params.append("page", page.toString());
  }

  if (take) {
    params.append("take", take.toString());
  }

  if (title) {
    params.append("title", title);
  }

  const response = await fetch(`${SERVER_URL}/blog?${params.toString()}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  const result = await response.json();
  return result;
}
