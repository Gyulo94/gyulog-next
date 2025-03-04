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
  id: z.number(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const blogSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumnail: z.string(),
  content: z.string(),
  userId: z.string(),
  category: categorySchema,
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  tags: tagSchema.array(),
});

export type Blog = z.infer<typeof blogSchema>;
export type Tags = z.infer<typeof tagSchema>;
export type Category = z.infer<typeof categorySchema>;
