// "use server";

// import fs from "fs";
// import { revalidatePath } from "next/cache";
// import { unauthorized } from "next/navigation";
// import { join } from "path";
// import { Blog } from "../schema";
// import { convertToAbsoluteUrl } from "../utils";
// import { BASE_URL } from "../constants";

// export async function findAll(page: number, take: number, title?: string) {
//   const params = new URLSearchParams();

//   if (page) {
//     params.append("page", page.toString());
//   }

//   if (take) {
//     params.append("take", take.toString());
//   }

//   if (title) {
//     params.append("title", title);
//   }

//   const response = await fetch(`${BASE_URL}/blog?${params.toString()}`, {
//     method: "GET",
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch blog");
//   }
//   const result = await response.json();

//   result.blogs = result.blogs.map((blog: Blog) => {
//     blog.thumbnail = convertToAbsoluteUrl(blog.thumbnail);
//     return blog;
//   });
//   return result;
// }

// export async function findByBot(title?: string) {
//   const params = new URLSearchParams();

//   if (title) {
//     params.append("title", title);
//   }

//   const response = await fetch(`${BASE_URL}/blog/bot?${params.toString()}`, {
//     method: "GET",
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch blog");
//   }
//   const result = await response.json();

//   const blog = result.map((blog: Blog) => {
//     blog.thumbnail = convertToAbsoluteUrl(blog.thumbnail);
//     return blog;
//   });
//   return blog;
// }

// export async function findByCategory(
//   page: number,
//   take: number,
//   category: string,
//   title?: string
// ) {
//   const params = new URLSearchParams();

//   if (page) {
//     params.append("page", page.toString());
//   }

//   if (take) {
//     params.append("take", take.toString());
//   }
//   if (title) {
//     params.append("title", title);
//   }

//   const response = await fetch(
//     `${BASE_URL}/category/${category}?${params.toString()}`,
//     {
//       method: "GET",
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch blog");
//   }
//   const result = await response.json();
//   // 이미지 URL을 절대 URL로 변환
//   result.blogs = result.blogs.map((blog: Blog) => {
//     blog.thumbnail = convertToAbsoluteUrl(blog.thumbnail);
//     return blog;
//   });
//   return result;
// }

// export async function findByTag(
//   page: number,
//   take: number,
//   tag: string,
//   title?: string
// ) {
//   const params = new URLSearchParams();

//   if (page) {
//     params.append("page", page.toString());
//   }

//   if (take) {
//     params.append("take", take.toString());
//   }
//   if (title) {
//     params.append("title", title);
//   }

//   const response = await fetch(
//     `${SERVER_URL}/tag/${tag}?${params.toString()}`,
//     {
//       method: "GET",
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch Tag");
//   }
//   const result = await response.json();
//   // 이미지 URL을 절대 URL로 변환
//   result.blogs = result.blogs.map((blog: Blog) => {
//     blog.thumbnail = convertToAbsoluteUrl(blog.thumbnail);
//     return blog;
//   });
//   return result;
// }

// export async function findById(id: number) {
//   const response = await fetch(`${SERVER_URL}/blog/${id}`, {
//     method: "GET",
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch blog");
//   }
//   const result = await response.json();
//   result.thumbnail = convertToAbsoluteUrl(result.thumbnail);
//   return result;
// }

// export async function createPost(formData: FormData) {
//   const session = await getServerAuthSession();
//   if (!session) {
//     throw new Error("No session found");
//   }
//   const response = await fetch(`${SERVER_URL}/blog`, {
//     method: "POST",
//     body: formData,
//     headers: {
//       authorization: `Bearer ${session.backendTokens.access_token}`,
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error("Failed to fetch Post:", errorText);
//     throw new Error("Failed to fetch Post");
//   }

//   revalidatePath("/");
//   const result = await response.json();
//   return result;
// }

// function sanitizeFileName(fileName: string): string {
//   return fileName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
// }

// export async function createMDX(
//   title: string,
//   content: string,
//   mdxCategory: string,
//   mdxTags: string,
//   createdAt: string
// ) {
//   const session = await getServerAuthSession();
//   if (!session) {
//     throw new Error("No session found");
//   }
//   const mdxContent = `
//   ---
//   title: "${title}"
//   category: "${mdxCategory}"
//   tags: "${mdxTags}"
//   createdAt: "${createdAt}"
//   ---

//   ${content}
//   `;
//   const sanitizedTitle = sanitizeFileName(title);
//   const filePath = join(
//     process.cwd(),
//     "app",
//     "contents",
//     `${sanitizedTitle}.mdx`
//   );

//   if (session.backendTokens.access_token) {
//     await fs.writeFileSync(filePath, mdxContent, "utf-8");
//     // console.log(`MDX content: ${mdxContent}`);
//   } else {
//     throw unauthorized();
//   }
// }

// export async function postViewCookie(id: number) {
//   try {
//     const response = await fetch(`${SERVER_URL}/blog/${id}/view`, {
//       method: "POST",
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Failed to increase view count:", errorText);
//       return false;
//     }

//     return true;
//   } catch (error) {
//     console.error("Error in postViewCookie:", error);
//     return false;
//   }
// }

// export async function editPost(id: number, formData: FormData) {
//   const session = await getServerAuthSession();
//   if (!session) {
//     throw new Error("No session found");
//   }
//   const response = await fetch(`${SERVER_URL}/blog/${id}`, {
//     method: "PATCH",
//     body: formData,
//     headers: {
//       authorization: `Bearer ${session.backendTokens.access_token}`,
//     },
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error("Failed to fetch Post:", errorText);
//     throw new Error("Failed to fetch Post");
//   }

//   revalidatePath(`/${id}`);
//   const result = await response.json();
//   return result;
// }

// export async function deletePost(id: number) {
//   const session = await getServerAuthSession();
//   if (!session) {
//     throw new Error("No session found");
//   }
//   const response = await fetch(`${SERVER_URL}/blog/${id}`, {
//     method: "DELETE",
//     headers: {
//       authorization: `Bearer ${session.backendTokens.access_token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch blog");
//   }

//   const result = await response.json();
//   return result;
// }
