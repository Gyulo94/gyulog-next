"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOutButton() {
  return (
    <Button type="button" onClick={() => signOut()}>
      로그아웃
    </Button>
  );
}
