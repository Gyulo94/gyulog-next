"use server";

import { SERVER_URL } from "../constants";

export async function createComment({
  blogId,
  author,
  password,
  content,
  userId,
}: {
  blogId: number;
  author?: string;
  password?: string;
  content: string;
  userId?: string;
}) {
  try {
    const response = await fetch(`${SERVER_URL}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, author, password, content, userId }),
    });
    if (response.ok) {
      const comment = await response.json();
      return comment;
    } else {
      console.log(await response.text());

      console.error("Failed to submit comment");
    }
  } catch (error) {
    console.error("Failed to submit comment", error);
  }
}

export async function findByBlogIdComment(id: number) {
  const response = await fetch(`${SERVER_URL}/comment/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    console.log(await response.text());

    throw new Error("Failed to fetch comment");
  }
  const result = await response.json();
  return result;
}

export async function createReply({
  blogId,
  author,
  password,
  content,
  userId,
  parentId,
}: {
  blogId: number;
  author?: string;
  password?: string;
  content: string;
  userId?: string;
  parentId: string;
}) {
  const response = await fetch(`${SERVER_URL}/comment/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      parentId,
      content,
      author,
      password,
      blogId,
      userId,
    }),
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to submit reply");
  }
  const newComment = await response.json();
  return newComment;
}

export async function confirmPassword(id: string, password: string) {
  const response = await fetch(`${SERVER_URL}/comment/password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, password }),
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to confirm password");
  }
  const result = await response.json();
  return result;
}

export async function updateComment(id: string, content: string) {
  const response = await fetch(`${SERVER_URL}/comment/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to update comment");
  }
  const result = await response.json();
  return {
    status: "success",
    message: "댓글이 수정되었습니다.",
    updatedComment: result,
  };
}

export async function deleteComment(id: string) {
  const response = await fetch(`${SERVER_URL}/comment/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to delete comment");
  }
  return { status: "success", message: "댓글이 삭제되었습니다." };
}
