import React from "react";
import CreatePostSubmitBtn from "../create-post/CreatePostSubmitBtn";
import { postComment } from "@/lib/dbActions";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";

type CommentFormProps = {
  props: {
    postId: string;
    session: Session;
  };
};

const CommentForm = ({ props }: CommentFormProps) => {
  const handleOnSubmit = async (formdata: FormData) => {
    "use server";

    await postComment(formdata, props.postId, props.session.user.id);
  };

  return (
    <form action={handleOnSubmit} className="p-4 flex gap-2">
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
  );
};

export default CommentForm;
