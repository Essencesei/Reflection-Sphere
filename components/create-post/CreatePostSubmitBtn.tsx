"use client";
import { Loader2 } from "lucide-react";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const CreatePostSubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button onClick={() => {}} disabled={pending} className="w-full">
      {pending ? (
        <span className="flex gap-4">
          <Loader2 className="animate-spin"></Loader2> Please wait
        </span>
      ) : (
        <span className="flex gap-4">Create</span>
      )}
    </Button>
  );
};

export default CreatePostSubmitBtn;
