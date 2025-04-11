import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .email("이메일 형식이어야 합니다.")
      .min(1, "이메일을 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다.")
      .regex(/[0-9]/, "숫자를 포함해야 합니다."),
    confirmPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
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
