import Image from "next/image";
import React from "react";

type ImageVideoContainerProps = {
  props: {
    url: string;
    width: number;
    height: number;
    className?: string;
  };
};

const ImageVideoContainer = ({ props }: ImageVideoContainerProps) => {
  const extension = props.url && props.url.split(".").pop();

  return (
    <>
      {["mkv", "mp4", "avi", "mov"].includes(extension as string) ? (
        <video
          src={props.url}
          controlsList="nodownload"
          controls
          className="aspect-video"
          autoPlay
        ></video>
      ) : (
        <Image
          src={props.url}
          alt={props.url}
          width={props.width}
          height={props.height}
          className={`object-cover w-full rounded-md  ${props.className}`}
        ></Image>
      )}
    </>
  );
};

export default ImageVideoContainer;
