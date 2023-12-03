"use client";
import React, { useState, useTransition } from "react";

import { updatePost } from "@/lib/dbActions";
import { redirect } from "next/navigation";
import { Textarea } from "../ui/textarea";
import CreatePostSubmitBtn from "../create-post/CreatePostSubmitBtn";
import { revalidatePath } from "next/cache";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Toggle } from "../ui/toggle";

type EditPostFormProps = {
  content: string;
  id: string;
};

const EditPostForm = ({ props }: { props: EditPostFormProps }) => {
  const [content, setcontent] = useState(props.content);
  const [privacy, setPrivacy] = useState<string>("Public");

  const handleContentChange = (event: any) => {
    setcontent(event.currentTarget.value);
  };

  return (
    <DialogContent className="max-w-[475px]">
      <DialogHeader>
        <DialogTitle>Edit Post</DialogTitle>
      </DialogHeader>
      <form
        action={async (e) => {
          await updatePost(e, props.id, privacy);
        }}
        className="flex flex-col gap-2"
      >
        <Textarea
          autoComplete="off"
          name="content"
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          required
        />
        <Toggle
          variant={"outline"}
          className="self-start"
          onClick={() => {
            if (privacy === "Public") setPrivacy("Private");
            else setPrivacy("Public");
          }}
        >
          {privacy === "Public" ? (
            <MdOutlinePublic className={"w-[15px] h-[15px]"} />
          ) : (
            <FaLock className={"w-[15px] h-[15px]"} />
          )}
        </Toggle>
        <CreatePostSubmitBtn name="Edit" />
      </form>
    </DialogContent>
  );
};

export default EditPostForm;
