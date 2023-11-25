"use client";
import { deletePost } from "@/libs/dbActions";
import React, { useTransition } from "react";
import { MdDelete } from "react-icons/md";

type DeletePostBtnProps = {
  id: string;
};

const DeletePostBtn = ({ id }: DeletePostBtnProps) => {
  const [ispending, startTransition] = useTransition();
  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await deletePost(id);
        });
      }}
      disabled={ispending}
      className=" btn btn-circle btn-ghost hover:bg-red-400"
    >
      {!ispending ? (
        <MdDelete />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
};

export default DeletePostBtn;
