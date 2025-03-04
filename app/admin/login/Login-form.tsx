"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { validateLoginForm } from "@/lib/actions/user.action";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface State {
  message?: string;
}

const LoginForm = () => {
  const [state, setState] = useState<State>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const validationResult = await validateLoginForm(formData);

    if (validationResult?.error) {
      setState(validationResult);
      return;
    }

    const result = await signIn("credentials", {
      email: validationResult?.data?.email,
      password: validationResult?.data?.password,
      redirect: false,
    });

    if (result?.status === 401) {
      setState({
        message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
      });
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요."
            className={state?.message ? "border-red-500" : ""}
          />
        </div>
        <div>
          <Label htmlFor="email">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            className={state?.message ? "border-red-500" : ""}
          />
        </div>
        {state?.message && (
          <p className="text-sm text-red-500 text-center">{state.message}</p>
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
