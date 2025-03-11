import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Comment } from "@/lib/schema";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { CommentPasswordButton } from "./comment-password-button";

/**
 * A single comment “bubble” that can show or hide its nested replies
 */

interface CommentDataProps {
  comment: Comment;
  addReply: (
    parentId: string,
    content: string,
    author: string,
    password: string,
    userId: string | undefined
  ) => Promise<void>;
  removeComment: (commentId: string) => void;
  editComment: (
    commentId: string,
    content: string,
    password: string
  ) => Promise<void>;
}
function CommentData({
  comment,
  addReply,
  removeComment,
  editComment,
}: CommentDataProps) {
  // Local state for typed reply content
  const [reply, setReply] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  // Toggle for showing the small reply form
  const [showReplyForm, setShowReplyForm] = useState(false);
  // Toggle for collapsing/expanding this comment's nested replies
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  // If user is editing, show a textarea instead of plain text
  const [isEditing, setIsEditing] = useState(false);
  // The text currently being edited
  const [editedContent, setEditedContent] = useState(comment.content);

  const { data: session } = useSession();
  const userId = session?.user.id || undefined;

  // Submits a new reply to this comment
  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addReply(comment.id, reply, author, password, userId);
    setReply("");
    setAuthor("");
    setPassword("");
    setShowReplyForm(false);
    setAreRepliesVisible(true); // Auto-expand replies after adding one
  };

  // Submits an edit to this comment
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editComment(comment.id, editedContent, password);
    setIsEditing(false);
  };

  // Number of direct replies for this comment
  const replyCount = comment.replies?.length || 0;

  // Check if server has marked this comment as deleted
  const isDeleted = comment.isDeleted;

  return (
    <div className="w-full break-words">
      {/* The main “bubble/card” for this comment */}
      <div className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-start space-x-5">
          {/* Avatar */}

          <div className="h-10 w-10 relative">
            <Image
              src={comment.profileImage}
              alt={comment.author}
              fill
              className={`${
                comment.author === session?.user.name && "rounded-full"
              } object-cover`}
            />
          </div>
          {/* Main content area */}
          <div className="flex-1">
            {/* Top row: user name + actions (if not deleted) */}
            <div className="flex justify-between items-start">
              <p className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-100 capitalize">
                {comment.author}
              </p>
              {!isDeleted && (
                <div>
                  <CommentPasswordButton
                    id={comment.id}
                    title="수정"
                    setIsEditing={setIsEditing}
                    removeComment={removeComment}
                  />
                  <CommentPasswordButton
                    id={comment.id}
                    title="삭제"
                    removeComment={removeComment}
                  />
                </div>
              )}
            </div>

            {/* Display the comment text:
                - If deleted, show "This comment has been deleted" text
                - If editing, show an edit form
                - Otherwise, show the original content
            */}
            {isDeleted ? (
              // Comment is deleted
              <p className="italic text-sm md:text-base text-gray-500 dark:text-gray-400 mt-3">
                {"댓글이 삭제되었습니다."}
                {/* Usually "This comment has been deleted" */}
              </p>
            ) : isEditing ? (
              // Editing form
              <form onSubmit={handleEditSubmit} className="mt-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => e && setEditedContent(e.target.value)}
                  rows={3}
                  required
                  className="border-gray-200 dark:border-gray-700 p-2"
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-sm"
                  >
                    취소
                  </Button>
                  <Button type="submit" className="px-3 py-1 text-sm">
                    저장
                  </Button>
                </div>
              </form>
            ) : (
              <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
                {comment.content}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center">
                <Button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  variant={"link"}
                  className="flex items-center text-blue-600 hover:underline"
                >
                  답글 작성
                </Button>
                {replyCount > 0 && (
                  <Button
                    onClick={() => setAreRepliesVisible(!areRepliesVisible)}
                    variant={"link"}
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    {areRepliesVisible ? (
                      <>
                        <Icons.chevronUp />
                        <p>답글 숨기기</p>
                      </>
                    ) : (
                      <>
                        <Icons.chevronDown />
                        <p>답글 보기 ({`${replyCount}`})</p>
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {format(comment.createdAt, "yyyy-MM-dd HH:mm")}
              </p>
            </div>

            {showReplyForm && (
              <form onSubmit={handleReplySubmit} className="mt-3">
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
                  <Button type="submit" className="px-3 py-1 text-sm">
                    작성
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Nested Replies (still show if parent's deleted, unless you prefer otherwise) */}
      {/* {areRepliesVisible && comment.replies && comment.replies.length > 0 && ( */}
      <AnimatePresence>
        {areRepliesVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-4 md:ml-6"
          >
            {comment.replies.map((reply) => (
              <CommentData
                key={reply.id}
                comment={reply}
                addReply={addReply}
                removeComment={removeComment}
                editComment={editComment}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* )} */}

      {/* Delete Confirmation Modal */}
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      /> */}
    </div>
  );
}

export default CommentData;
