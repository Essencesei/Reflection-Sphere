"use client";
import React, { useState } from "react";
import CreatePostSubmitBtn from "./CreatePostSubmitBtn";
import { createPost } from "@/lib/dbActions";
import { Textarea } from "../ui/textarea";
import { UploadZone } from "../UploadZone";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Toggle } from "../ui/toggle";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock, FaRegFileVideo } from "react-icons/fa";
import CreatePostFileIndicator from "./CreatePostFileIndicator";

const CreatePost = () => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [imgKey, setImgKey] = useState();
  const [addImage, setAddImage] = useState(false);
  const [done, setDone] = useState(false);
  const [privacy, setPrivacy] = useState<string>("Public");

  const handleOnClientUploadComplete = (res: any, done: boolean) => {
    setImgUrl(res[0].url);
    setImgKey(res[0].key);
    setDone(done);
    setAddImage(false);
  };

  return (
    <DialogContent className="max-w-[457px]">
      <DialogHeader>
        <DialogTitle>Create Post</DialogTitle>
      </DialogHeader>

      <form
        action={async (e) => {
          await createPost(e, imgUrl!, imgKey!, privacy);
          setImgUrl("");
        }}
        className="flex gap-2 p-4"
      >
        <div className="flex flex-col w-full gap-2 items-center ">
          <Textarea
            autoComplete="off"
            name="content"
            placeholder="What's on your mind?"
            required
          />
          <div className="flex w-full gap-2">
            <CreatePostFileIndicator
              props={{ imgKey: imgKey!, imgUrl: imgUrl! }}
            />
            <Toggle
              variant={"outline"}
              className="border border-primary"
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
          </div>

          <UploadZone onClientUploadComplete={handleOnClientUploadComplete} />
          <DialogClose className="w-full">
            <CreatePostSubmitBtn toastMessage="Post Created!" />
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default CreatePost;
