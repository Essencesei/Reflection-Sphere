"use client";
import React, { useState, useTransition } from "react";

import { updatePost } from "@/lib/dbActions";
import { redirect } from "next/navigation";
import { Textarea } from "../ui/textarea";
import CreatePostSubmitBtn from "../create-post/CreatePostSubmitBtn";
import { revalidatePath } from "next/cache";

type EditPostFormProps = {
  content: string;
  id: string;
};

const EditPostForm = ({ props }: { props: EditPostFormProps }) => {
  const [content, setcontent] = useState(props.content);

  const handleContentChange = (event: any) => {
    setcontent(event.currentTarget.value);
  };

  return (
    <form
      action={async (e) => {
        await updatePost(e, props.id);
      }}
      className="flex flex-col gap-2"
    >
      <Textarea
        name="content"
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        required
      />
      <CreatePostSubmitBtn />
    </form>
  );
};

export default EditPostForm;
