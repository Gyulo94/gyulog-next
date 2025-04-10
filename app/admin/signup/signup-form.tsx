"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signUpWithCredentials } from "@/lib/actions/user.action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [state, action] = useActionState(signUpWithCredentials, undefined);

  useEffect(() => {
    const errorFields = ["name", "email", "password", "confirmPassword"];

    errorFields.forEach((field) => {
      const errorMessage = (
        state?.error as Record<string, string[]> | undefined
      )?.[field]?.[0];
      if (errorMessage) {
        toast.error(errorMessage);
      }
    });
  }, [state?.error]);

  console.log("state", state);

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
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력하세요."
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
        <div>
          <Label htmlFor="email">비밀번호 확인</Label>
          <Input
            id="password"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 재입력하세요."
          />
        </div>
        <div>
          <SubmitButton className="w-full" variant="default">
            회원가입
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
