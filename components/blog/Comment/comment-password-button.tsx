import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { confirmPassword } from "@/lib/actions/comment.action";
import { useState } from "react";
import { toast } from "sonner";

export function CommentPasswordButton({
  id,
  title,
  setIsEditing,
  removeComment,
}: {
  id: string;
  title: string;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  removeComment: (commentId: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "수정") {
      const response = await confirmPassword(id, password);
      if (response) {
        toast.success("비밀번호가 확인되었습니다.");
        if (setIsEditing) {
          setIsEditing(response);
        }
        setPassword("");
        setDialogOpen(false);
      } else {
        setPassword("");
        setDialogOpen(false);
        toast.error("비밀번호가 일치하지 않습니다.");
      }
    } else {
      const response = await confirmPassword(id, password);
      if (response) {
        toast.success("비밀번호가 확인되었습니다.");
        setPassword("");
        setDialogOpen(false);

        await removeComment(id);
      } else {
        setPassword("");
        setDialogOpen(false);
        toast.error("비밀번호가 일치하지 않습니다.");
      }
    }
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className="dark:hover:text-[#ddd]"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>비밀번호 입력</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-5">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="password" className="sr-only">
                비밃번호
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => e && setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end mt-5">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                닫기
              </Button>
            </DialogClose>
            <SubmitButton>확인</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
