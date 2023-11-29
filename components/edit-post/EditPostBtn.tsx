"use client";
import { MdEdit } from "react-icons/md";
import React, { useTransition } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type EditPostBtnProps = {
  id: string;
};

const EditPostBtn = ({ id }: EditPostBtnProps) => {
  const [ispending, startTransition] = useTransition();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      {!ispending ? (
        "Edit"
      ) : (
        <span className="flex gap-4">
          <Loader2 className="animate-spin"></Loader2>
          Please wait
        </span>
      )}
    </Button>
  );
};

export default EditPostBtn;
