"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { likePost } from "@/lib/dbActions";
import { BiLike } from "react-icons/bi";
import { Loader2 } from "lucide-react";

type LikeButtonProps = {
  props: {
    id: string;
    userid: string;
  };
  buttonState?: {
    liked: boolean;
  };
};

const LikeButton = ({ props, buttonState }: LikeButtonProps) => {
  const [isLoading, startTransition] = useTransition();

  return (
    // <Button
    //   className="flex items-center gap-2"
    //   disabled={buttonState?.liked}
    //   onClick={() => {
    //     startTransition(async () => {
    //       await likePost(props.id, props.userid);
    //     });
    //   }}
    // >
    //   {isLoading && <Loader2 className="animate-spin" />}
    //   {!isLoading && <BiLike />}

    //   {buttonState?.liked ? "Liked" : "Like"}
    // </Button>

    <BiLike
      className={`w-[30px] h-[30px] cursor-pointer ${
        buttonState?.liked && "text-blue-500"
      }`}
      disabled={buttonState?.liked}
      onClick={() => {
        startTransition(async () => {
          await likePost(props.id, props.userid);
        });
      }}
    ></BiLike>
  );
};

export default LikeButton;
