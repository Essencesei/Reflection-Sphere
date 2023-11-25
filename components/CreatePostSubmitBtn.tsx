"use client";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type CreatePostSubmitBtnProps = {
  children: React.ReactNode;
  className: string;
} & ComponentProps<"button">;

const CreatePostSubmitBtn = ({
  children,
  className,
}: CreatePostSubmitBtnProps) => {
  const { pending } = useFormStatus();
  return (
    <button className={className} onClick={() => {}} disabled={pending}>
      {pending && <span className="loading loading-spinner"></span>} {children}
    </button>
  );
};

export default CreatePostSubmitBtn;
