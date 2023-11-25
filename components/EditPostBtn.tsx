"use client";
import { MdEdit } from "react-icons/md";
import React, { useTransition } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

type EditPostBtnProps = {
  id: string;
};

const EditPostBtn = ({ id }: EditPostBtnProps) => {
  const [ispending, startTransition] = useTransition();
  return (
    <button
      className=" btn btn-circle btn-ghost"
      onClick={() => {
        startTransition(async () => {
          redirect(`/edit/${id}`);
        });
      }}
    >
      {!ispending ? (
        <MdEdit />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
};

export default EditPostBtn;
