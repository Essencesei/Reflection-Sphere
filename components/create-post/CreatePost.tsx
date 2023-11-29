"use client";
import React, { useState } from "react";
import CreatePostSubmitBtn from "./CreatePostSubmitBtn";
import { createPost } from "@/lib/dbActions";
import UploadBtn from "../UploadBtn";
import { Textarea } from "../ui/textarea";
import { UploadDropzone } from "@/lib/uploadthings/uploadthings";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadZone } from "../UploadZone";

const CreatePost = () => {
  const [imgUrl, setImgUrl] = useState();
  const [imgKey, setImgKey] = useState();
  const [addImage, setAddImage] = useState(false);
  const [done, setDone] = useState(false);

  const handleOnClientUploadComplete = (res: any, done: boolean) => {
    console.log(res, "RES");
    setImgUrl(res[0].url);
    setImgKey(res[0].key);
    setDone(done);
    setAddImage(false);
  };

  return (
    <div>
      <form
        action={async (e) => {
          await createPost(e, imgUrl!, imgKey!);
        }}
        className="flex gap-2 p-4"
      >
        <div className="flex flex-col w-full gap-2 items-center ">
          <Textarea
            name="content"
            placeholder="What's on your mind?"
            required
          />
          <UploadZone onClientUploadComplete={handleOnClientUploadComplete} />

          <CreatePostSubmitBtn />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
