"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signInWithCredentials } from "@/lib/actions/user.action";
import { useActionState } from "react";

const LoginForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
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
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
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
