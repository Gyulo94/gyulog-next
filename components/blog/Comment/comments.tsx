"use client";

import { useEffect, useState } from "react";

import {
  createReply,
  deleteComment,
  findByBlogIdComment,
  updateComment,
} from "@/lib/actions/comment.action";
import { Comment } from "@/lib/schema";

import Loader from "@/components/shared/loader";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import CommentData from "./comment-data";
import CommentForm from "./comment-form";

export default function Comments({ blogId }: { blogId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const calculateCommentCount = (commentsArray: Comment[]) => {
    let count = commentsArray.length;

    const getNestedCount = (arr: Comment[]) => {
      let nestedCount = 0;
      arr.forEach((c: Comment) => {
        if (c.replies && c.replies.length) {
          nestedCount += c.replies.length;
          nestedCount += getNestedCount(c.replies);
        }
      });
      return nestedCount;
    };

    count += getNestedCount(commentsArray);
    return count;
  };

  useEffect(() => {
    async function loadComments() {
      try {
        const initialComments = await findByBlogIdComment(blogId);
        if (Array.isArray(initialComments)) {
          const nestedComments = buildNestedComments(initialComments);
          setComments(nestedComments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Failed to load comments", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [blogId]);

  const buildNestedComments = (comments: Comment[]) => {
    const commentMap: { [key: string]: Comment } = {};
    const nestedComments: Comment[] = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment.id] = comment;
    });

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parentComment = commentMap[comment.parentId];
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      } else {
        nestedComments.push(comment);
      }
    });

    return nestedComments;
  };

  const markCommentAsDeleted = (commentList: any, targetId: any) => {
    return commentList.map((comment: any) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          content: "This comment has been deleted",
          isDeleted: true,
        };
      } else if (comment.replies?.length) {
        return {
          ...comment,
          replies: markCommentAsDeleted(comment.replies, targetId),
        };
      }
      return comment;
    });
  };

  const addReply = async (
    parentId: string,
    content: string,
    author: string,
    password: string,
    userId: string | undefined
  ) => {
    try {
      const result = await createReply({
        parentId,
        content,
        author,
        password,
        blogId,
        userId,
      });
      const { newComment, status, message } = result;
      if (status === "success") {
        toast.success(message);

        const updateReplies = (
          list: Comment[],
          targetId: string,
          newData: Comment
        ): Comment[] => {
          return list.map((c: Comment) => {
            if (c.id === targetId) {
              return {
                ...c,
                replies: [...(c.replies || []), newData],
              };
            } else if (c.replies?.length) {
              return {
                ...c,
                replies: updateReplies(c.replies, targetId, newData),
              };
            }
            return c;
          });
        };

        setComments((prev) => updateReplies(prev, parentId, newComment));
      }
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };
  const removeComment = async (commentId: string) => {
    try {
      const response = await deleteComment(commentId);
      if (response.status === "success") {
        toast.success(response.message);
        setComments((prev) => markCommentAsDeleted(prev, commentId));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };
  const editComment = async (commentId: string, content: string) => {
    try {
      const response = await updateComment(commentId, content);
      if (response.status === "success") {
        toast.success(response.message);
        const updatedComment = response.updatedComment;
        // Recursively update the target comment
        const updateComments = (
          list: Comment[],
          targetId: string,
          newContent: string
        ): Comment[] => {
          return list.map((c: Comment) => {
            if (c.id === targetId) {
              return { ...c, content: newContent };
            } else if (c.replies?.length) {
              return {
                ...c,
                replies: updateComments(c.replies, targetId, newContent),
              };
            }
            return c;
          });
        };

        setComments((prev) =>
          updateComments(prev, commentId, updatedComment.content)
        );
      } else {
        console.error("Failed to update comment");
      }
    } catch (error) {
      console.error("Failed to update comment", error);
    }
  };

  const commentCount = calculateCommentCount(comments);

  return (
    <div className="w-full mx-auto mt-10">
      <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg shadow-md w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          댓글 {commentCount > 0 && `(${commentCount})`}
        </h2>

        <CommentForm setComments={setComments} blogId={blogId} />

        {loading ? (
          <div className="flex justify-center my-6">
            <Loader />
          </div>
        ) : (
          <div className="mt-6">
            {comments.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">
                아직 작성된 댓글이 없습니다.
              </p>
            ) : (
              comments.map((comment) => (
                <CommentData
                  key={comment.id}
                  comment={comment}
                  addReply={addReply}
                  removeComment={removeComment}
                  editComment={editComment}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
