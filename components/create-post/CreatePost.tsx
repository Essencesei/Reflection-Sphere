"use client";
import React, { useState } from "react";
import CreatePostSubmitBtn from "./CreatePostSubmitBtn";
import { createPost } from "@/lib/dbActions";
import UploadBtn from "../UploadBtn";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/lib/uploadthings/uploadthings";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadZone } from "../UploadZone";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Toggle } from "../ui/toggle";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Image from "next/image";

const CreatePost = () => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [imgKey, setImgKey] = useState();
  const [addImage, setAddImage] = useState(false);
  const [done, setDone] = useState(false);
  const [privacy, setPrivacy] = useState<string>("Public");

  const handleOnClientUploadComplete = (res: any, done: boolean) => {
    console.log(res, "RES");
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

          {imgUrl && (
            <Image
              className="self-start aspect-square border border-primary rounded-sm"
              src={imgUrl!}
              alt={imgKey!}
              width={40}
              height={40}
            />
          )}

          <Toggle
            className="self-start"
            onClick={() => {
              if (privacy === "Public") setPrivacy("Private");
              else setPrivacy("Public");
            }}
          >
            {privacy === "Public" ? (
              <MdOutlinePublic className={"w-[20px] h-[20px]"} />
            ) : (
              <FaLock className={"w-[20px] h-[20px]"} />
            )}
          </Toggle>

          <UploadZone onClientUploadComplete={handleOnClientUploadComplete} />

          <DialogClose>
            <CreatePostSubmitBtn />
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  );
};

export default CreatePost;
