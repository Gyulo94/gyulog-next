"use server";

import { FormState, LoginFormSchema } from "../schema";

export async function validateLoginForm(
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  return { data: validationFields.data };
}
