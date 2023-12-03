"use client";
import React, { useOptimistic } from "react";
import CreatePostSubmitBtn from "../create-post/CreatePostSubmitBtn";
import { postComment } from "@/lib/dbActions";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { Prisma } from "@prisma/client";
import CommentList from "./CommentList";

type CommentFormProps = {
  props: {
    postId: string;
    session: Session;
    comments: Array<
      Prisma.CommentGetPayload<{
        include: { author: { select: { name: true; image: true } } };
      }>
    >;
  };
};

type newCommentProps = {
  comment: string;
  id: string;
};

const CommentForm = ({ props }: CommentFormProps) => {
  const [optimisticComment, addOptimisticComment] = useOptimistic(
    props.comments,
    (state, newComment: any) => {
      return [...state, newComment];
    }
  );

  return (
    <>
      <form
        action={async (formData) => {
          addOptimisticComment({
            comment: formData.get("comment")?.toString(),
            id: Math.random().toString(),
          });

          await postComment(formData, props.postId, props.session.user.id);
        }}
        className="p-4 flex gap-2"
      >
        <div className="flex-1 flex gap-2">
          <Avatar>
            <AvatarImage src={props.session.user.image!}></AvatarImage>
            <AvatarFallback>
              {props.session.user.name?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <Input
            autoComplete="off"
            placeholder="Write Comment"
            name="comment"
            required
          />
        </div>
        <div className="flex-0">
          <CreatePostSubmitBtn toastMessage="Comment Added!" />
        </div>
      </form>
      <div className="pl-8 p-4 flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
        <span>Comments</span>
        <CommentList props={optimisticComment}></CommentList>
      </div>
    </>
  );
};

export default CommentForm;
