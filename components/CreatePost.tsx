"use client";
import React, { useState } from "react";
import CreatePostSubmitBtn from "./CreatePostSubmitBtn";
import { createPost } from "@/libs/dbActions";
import UploadBtn from "./UploadBtn";

const CreatePost = () => {
  const [imgUrl, setImgUrl] = useState();
  const [addImage, setAddImage] = useState(false);
  const [done, setDone] = useState(false);
  const handleOnClientUploadComplete = (res: any, done: boolean) => {
    setImgUrl(res[0].url);
    setDone(done);
    setAddImage(false);
  };

  return (
    <div>
      <form
        action={async (e) => {
          await createPost(e, imgUrl!);
        }}
        className="flex gap-2 p-4"
      >
        <div className="flex flex-col w-full gap-2 items-center ">
          <textarea
            className="textarea textarea-primary whitespace-pre-wrap w-full h-[40px]"
            name="content"
            placeholder="Content"
            required
          />
          <div className="flex gap-2 items-baseline ">
            <UploadBtn
              onClientUploadComplete={handleOnClientUploadComplete}
            ></UploadBtn>

            <CreatePostSubmitBtn className="btn btn-success ">
              Create
            </CreatePostSubmitBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
