"use server";

import { SERVER_URL } from "../constants";
import { Blog } from "../schema";
import { convertToAbsoluteUrl } from "../utils";

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

  result.blogs = result.blogs.map((blog: Blog) => {
    blog.thumnail = convertToAbsoluteUrl(blog.thumnail);
    return blog;
  });
  return result;
}

export async function findByCategory(
  page: number,
  take: number,
  category: string,
  title?: string
) {
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

  const response = await fetch(
    `${SERVER_URL}/category/${category}?${params.toString()}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  const result = await response.json();
  // 이미지 URL을 절대 URL로 변환
  result.blogs = result.blogs.map((blog: Blog) => {
    blog.thumnail = convertToAbsoluteUrl(blog.thumnail);
    return blog;
  });
  return result;
}

export async function findById(id: number) {
  const response = await fetch(`${SERVER_URL}/blog/${id}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  const result = await response.json();
  result.thumnail = convertToAbsoluteUrl(result.thumnail);
  return result;
}
