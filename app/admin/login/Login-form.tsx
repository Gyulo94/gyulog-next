"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [state, action] = useActionState(signInWithCredentials, undefined);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const errorFields = ["email", "password"];

    errorFields.forEach((field) => {
      const errorMessage = (
        state?.error as Record<string, string[]> | undefined
      )?.[field]?.[0];
      if (errorMessage) {
        toast.error(errorMessage);
      }
    });
  }, [state?.error]);
  useEffect(() => {
    if (state?.status === 200) {
      toast.success(state.message);
      router.push("/admin");
    }
  }, [state?.status]);

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요."
          />
        </div>
        <div>
          <Label htmlFor="email">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        {state && state.status == 400 && (
          <div className="text-center text-destructive">{state.message}</div>
        )}
        <div>
          <SubmitButton className="w-full" variant="default">
            로그인
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
