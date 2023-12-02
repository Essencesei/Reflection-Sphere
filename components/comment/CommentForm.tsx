import React from "react";
import { Textarea } from "../ui/textarea";
import CreatePostSubmitBtn from "../create-post/CreatePostSubmitBtn";
import { postComment } from "@/lib/dbActions";
import { Input } from "../ui/input";

type CommentFormProps = {
  props: {
    postId: string;
    authorId: string | undefined;
  };
};

const CommentForm = ({ props }: CommentFormProps) => {
  const handleOnSubmit = async (formdata: FormData) => {
    "use server";

    await postComment(formdata, props.postId, props.authorId!);
  };

  return (
    <form action={handleOnSubmit} className="p-4 flex gap-2">
      <div className="flex-1">
        <Input
          autoComplete="false"
          placeholder="Write Comment"
          name="comment"
          required
        />
      </div>
      <div className="flex-0">
        <CreatePostSubmitBtn name="Comment" />
      </div>
    </form>
  );
};

export default CommentForm;
