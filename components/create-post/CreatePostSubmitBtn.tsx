"use client";
import { Loader2 } from "lucide-react";
import React, { ComponentProps, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { FiSend } from "react-icons/fi";
import { useToast } from "../ui/use-toast";

type CreatePostSubmitBtnProps = {
  name?: string;
  toastMessage: string;
};

const CreatePostSubmitBtn = ({
  name,
  toastMessage,
}: CreatePostSubmitBtnProps) => {
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const [isLoading, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          toast({
            title: toastMessage,
          });
        });
      }}
      disabled={pending}
      className="w-full"
    >
      {pending ? (
        <span className="flex gap-4">
          <Loader2 className="animate-spin" />
        </span>
      ) : (
        <span className="flex gap-4">
          <FiSend />
        </span>
      )}
    </Button>
  );
};

export default CreatePostSubmitBtn;
