"use client";
import { UploadButton } from "@/libs/uploadthings";
import React from "react";
import "@uploadthing/react/styles.css";

type UploadBtnProps = {
  onClientUploadComplete: (res: any, done: boolean) => void;
};

const UploadBtn = ({ onClientUploadComplete }: UploadBtnProps) => {
  return (
    <UploadButton
      className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50  "
      endpoint="imageUploader"
      onClientUploadComplete={(res): any => {
        // Do something with the response
        onClientUploadComplete(res, true);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadBtn;
