export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      status?: number;
      message?: string;
    }
  | undefined;
