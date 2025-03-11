import { Input } from "@/components/ui/input"; // Adjust the import path according to your project structure
import SubmitButton from "@/components/ui/submitButton";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/lib/actions/comment.action";
import { Comment } from "@/lib/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CommentForm({
  setComments,
  blogId,
}: {
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  blogId: number;
}) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId) {
      const response = await createComment({
        blogId,
        content: comment,
        userId,
      });
      const { status, message, newComment } = response;
      if (status === "success") {
        toast.success(message);
        setComments((prev) => [...prev, newComment]);
      }
    } else {
      const response = await createComment({
        blogId,
        author,
        password,
        content: comment,
        userId,
      });
      const { status, message, newComment } = response;
      if (status === "success") {
        toast.success(message);
        setComments((prev) => [...prev, newComment]);
      }
    }
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {session && session.user ? (
        <Textarea
          name="comment"
          placeholder="댓글 작성"
          className="w-full"
          rows={3}
          value={comment}
          onChange={(e) => e && setComment(e.target.value)}
          required
        />
      ) : isMobile ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="이름"
              value={author}
              onChange={(e) => e && setAuthor(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => e && setPassword(e.target.value)}
              required
            />
          </div>
          <Textarea
            name="comment"
            placeholder="댓글 작성"
            className="w-full"
            rows={3}
            value={comment}
            onChange={(e) => e && setComment(e.target.value)}
            required
          />
        </div>
      ) : (
        <div className="flex gap-2 justify-center items-center">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="이름"
              value={author}
              onChange={(e) => e && setAuthor(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => e && setPassword(e.target.value)}
              required
            />
          </div>
          <Textarea
            name="comment"
            placeholder="댓글 작성"
            className="w-full"
            rows={3}
            value={comment}
            onChange={(e) => e && setComment(e.target.value)}
            required
          />
        </div>
      )}
      <div className="flex justify-end mt-2">
        <SubmitButton variant="ghost">작성</SubmitButton>
      </div>
    </form>
  );
}

export default CommentForm;
