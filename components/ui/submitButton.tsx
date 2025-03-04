"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

interface SubmitButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: "default" | "ghost";
}

const SubmitButton = ({ children, className, variant }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className={className}
      variant={variant}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          className="absolute"
          src="/images/spinner.gif"
          alt="로딩중"
          width={18}
          height={18}
        />
      ) : (
        children
      )}
    </Button>
  );
};
export default SubmitButton;
