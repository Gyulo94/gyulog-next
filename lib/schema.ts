import { z } from "zod";

export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      data?: z.infer<typeof LoginFormSchema>;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  content: z.string(),
  userId: z.string(),
  category: categorySchema,
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  tags: tagSchema.array(),
  viewCnt: z.number(),
});

export const updateUserSchema = z.object({
  profileImage: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const createCommentSchema = z.object({
  blogId: z.number(),
  content: z.string(),
  author: z.string(),
  password: z.string(),
  userId: z.string().optional(),
  parentId: z.number().optional(),
});

export type Blog = z.infer<typeof blogSchema>;
export type Tags = z.infer<typeof tagSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Comment = z.infer<typeof createCommentSchema> & {
  id: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  replies: Comment[];
};
