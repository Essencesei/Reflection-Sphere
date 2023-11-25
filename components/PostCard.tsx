import { timeFormatter } from "@/libs/timeFormatter";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import DeletePostBtn from "./DeletePostBtn";
import { getServerSession } from "next-auth";

import EditPostBtn from "./EditPostBtn";
import { authOptions } from "@/auth";

type PostCardProps = Prisma.PostGetPayload<{
  include: { author: { select: { name: true; image: true } } };
}>;

const PostCard = async ({ props }: { props: PostCardProps }) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="card rounded-md border   p-4 m-4 shadow-md">
      <div className="card-title flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={props.author.image!}
            alt={props.author.name!}
            width={40}
            height={40}
          ></Image>
          <div className="lg:flex items-center gap-2">
            <p className="line-clamp-1">{props.author?.name}</p>
            <p className="text-sm">{timeFormatter(props.createdAt)}</p>
          </div>
          {props.createdAt < props.updatedAt && (
            <span className="badge badge-primary">Edited</span>
          )}
        </div>
        <div className="flex">
          {props.authorId === session?.user.id && (
            <>
              <DeletePostBtn id={props.id} />
              <EditPostBtn id={props.id} />
            </>
          )}
        </div>
      </div>

      <div className="card-body ">
        <p className="whitespace-pre-wrap">{props.content}</p>
        <div className="flex justify-center bg-slate-800">
          {props.image && (
            <Image
              src={props.image!}
              alt={"image"}
              width={400}
              height={400}
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
