"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submitButton";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ReplyCommentFormProps {
  handleReplySubmit: (
    reply: string,
    author?: string,
    password?: string,
    userId?: string | undefined
  ) => Promise<void>;
}

export default function ReplyCommentForm({
  handleReplySubmit,
}: ReplyCommentFormProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [reply, setReply] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function addReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userId) {
      await handleReplySubmit(reply, userId);
    } else {
      await handleReplySubmit(reply, author, password, undefined);
    }
  }
  return isMobile ? (
    <form onSubmit={addReply} className="mt-10">
      {session && session.user ? (
        <Textarea
          placeholder="답글 작성하기"
          rows={2}
          required
          value={reply}
          onChange={(e) => e && setReply(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 p-2"
        />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="이름"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 p-2"
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-700 p-2"
              required
            />
          </div>
          <Textarea
            placeholder="답글 작성하기"
            rows={2}
            required
            value={reply}
            onChange={(e) => e && setReply(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 p-2"
          />
        </div>
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <Button
          type="button"
          onClick={() => setShowReplyForm(false)}
          variant={"ghost"}
          className="px-3 py-1 text-sm"
        >
          취소
        </Button>
        <SubmitButton>작성</SubmitButton>
      </div>
    </form>
  ) : (
    <form onSubmit={handleReplySubmit} className="mt-10">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 p-2"
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-700 p-2"
            required
          />
        </div>
        <Textarea
          placeholder="답글 작성하기"
          rows={2}
          required
          value={reply}
          onChange={(e) => e && setReply(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 p-2"
        />
      </div>
      <div className="flex justify-end space-x-2 mt-2">
        <Button
          type="button"
          onClick={() => setShowReplyForm(false)}
          variant={"ghost"}
          className="px-3 py-1 text-sm"
        >
          취소
        </Button>
        <SubmitButton>작성</SubmitButton>
      </div>
    </form>
  );
}
