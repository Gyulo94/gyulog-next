"use server";
import { SERVER_URL } from "../constants";

export async function findAllTags() {
  const response = await fetch(`${SERVER_URL}/tag`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tag");
  }
  const result = await response.json();
  return result;
}
