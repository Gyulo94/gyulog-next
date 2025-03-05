"use server";
import { SERVER_URL } from "../constants";

export async function findAllCategory() {
  const response = await fetch(`${SERVER_URL}/category`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  const result = await response.json();
  return result;
}
