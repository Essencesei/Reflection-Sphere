"use client";
import React, { useState, useTransition } from "react";
import CreatePostSubmitBtn from "./CreatePostSubmitBtn";
import { updatePost } from "@/libs/dbActions";
import { redirect } from "next/navigation";

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
        redirect("/mypage");
      }}
      className="flex flex-col gap-2"
    >
      <textarea
        className="textarea textarea-primary h-[75vh]"
        name="content"
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        required
      />
      <CreatePostSubmitBtn className="btn btn-success">
        Edit
      </CreatePostSubmitBtn>
    </form>
  );
};

export default EditPostForm;
