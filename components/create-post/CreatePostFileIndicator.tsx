import React from "react";
import { FaRegFileVideo } from "react-icons/fa";
import Image from "next/image";
import { CiFileOff } from "react-icons/ci";

type CreatePostFileIndicatorProps = {
  props: {
    imgUrl: string;
    imgKey: string;
  };
};

const CreatePostFileIndicator = ({
  props: { imgUrl, imgKey },
}: CreatePostFileIndicatorProps) => {
  const imgExtension = [
    "jpeg",
    "jpg",
    "png",
    "gif",
    "tiff",
    "tif",
    "bmp",
    "webp",
    "svg",
    "ico",
    "psd",
    "raw",
  ];
  const vidExtensions = ["mkv", "avi", "mp4", "mov"];
  return (
    <>
      {vidExtensions.includes(imgUrl?.split(".")[2] as string) ? (
        <div className="flex items-center justify-center w-[40px] h-[40px] self-start aspect-square border border-primary rounded-sm">
          <FaRegFileVideo />
        </div>
      ) : imgExtension.includes(imgUrl?.split(".")[2] as string) ? (
        <Image
          className="self-start aspect-square border border-primary rounded-sm"
          src={imgUrl!}
          alt={imgKey!}
          width={40}
          height={40}
        />
      ) : (
        <div className="flex items-center justify-center w-[40px] h-[40px] self-start aspect-square border border-primary rounded-sm">
          <CiFileOff />
        </div>
      )}
    </>
  );
};

export default CreatePostFileIndicator;
