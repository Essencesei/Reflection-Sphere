import React from "react";
import { Skeleton } from "./ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className=" flex flex-col gap-4 p-4 pt-44 ">
      <div className="flex items-center gap-4">
        <Skeleton className="h-[40px] w-[40px] rounded-full"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[20px] w-[160px] "></Skeleton>
          <Skeleton className="h-[10px] w-[110px] "></Skeleton>
        </div>
      </div>
      <div className="flex  flex-col gap-4">
        <Skeleton className="h-[30px] w-[160px] "></Skeleton>
        <Skeleton className="h-[300px] w-full "></Skeleton>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
