import { UploadDropzone } from "@/lib/uploadthings/uploadthings";
import "@uploadthing/react/styles.css";

type UploadZoneProps = {
  onClientUploadComplete: (res: any, done: boolean) => void;
};

export const UploadZone = ({ onClientUploadComplete }: UploadZoneProps) => (
  <UploadDropzone
    className="w-full"
    appearance={{
      button: "bg-primary",
      label: "text-primary hover:text-primary",
    }}
    config={{ mode: "auto" }}
    endpoint="imageUploader"
    onClientUploadComplete={(res) => {
      onClientUploadComplete(res, true);
    }}
    onUploadError={(error: Error) => {}}
    onUploadBegin={(name) => {
      // Do something once upload begins
      // console.log("Uploading: ", name);
    }}
  />
);
