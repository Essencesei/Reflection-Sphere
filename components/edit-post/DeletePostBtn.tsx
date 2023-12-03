"use client";
import { deletePost } from "@/lib/dbActions";
import React, { useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";

type DeletePostBtnProps = {
  id: string;
  imgkey: string;
  toastMessage: string;
};

const DeletePostBtn = ({ id, imgkey, toastMessage }: DeletePostBtnProps) => {
  const [ispending, startTransition] = useTransition();
  return (
    <button
      className="w-full text-start"
      onClick={() => {
        startTransition(async () => {
          await deletePost(id, imgkey);
          toast({
            title: toastMessage,
          });
        });
      }}
      disabled={ispending}
    >
      {!ispending ? (
        "Delete"
      ) : (
        <span className="flex gap-4">
          <Loader2 className="animate-spin"></Loader2>
          Please wait
        </span>
      )}
    </button>
  );
};

export default DeletePostBtn;
