import { timeFormatter } from "@/lib/timeFormatter";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import DeletePostBtn from "./edit-post/DeletePostBtn";
import { getServerSession } from "next-auth";
import { SlOptionsVertical } from "react-icons/sl";

import EditPostBtn from "./edit-post/EditPostBtn";
import { authOptions } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import EditPostForm from "./edit-post/EditPostForm";
import { getPostById } from "@/lib/dbActions";

type PostCardProps = Prisma.PostGetPayload<{
  include: { author: { select: { name: true; image: true } } };
}>;

const PostCard = async ({ props }: { props: PostCardProps }) => {
  const session = await getServerSession(authOptions);

  const readMore = props.content.length > 500;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={props.author.image as string}
                  alt={props.author.name as string}
                ></AvatarImage>
                <AvatarFallback>
                  {props.author.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <CardDescription className="flex flex-col">
                <span className="text-lg">{props.author.name}</span>
                <span> {timeFormatter(props.createdAt)}</span>
              </CardDescription>
            </div>
            <div>
              {props.authorId === session?.user.id && (
                <Popover>
                  <PopoverTrigger>
                    <SlOptionsVertical />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col">
                      <DeletePostBtn id={props.id!} imgkey={props.imagekey!} />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"ghost"}>Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[475px]">
                          <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                          </DialogHeader>
                          <EditPostForm
                            props={{
                              content: props.content,
                              id: props.id,
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap ">{props.content}</p>
          <br />
          <div className="flex justify-center bg-slate-500 ">
            <Dialog>
              <DialogTrigger>
                {props.image && (
                  <Image
                    src={props.image!}
                    alt={"image"}
                    width={400}
                    height={400}
                    className="object-contain"
                  ></Image>
                )}
              </DialogTrigger>
              <DialogContent className=" max-w-[475px] flex justify-center items-center">
                {props.image && (
                  <Image
                    src={props.image!}
                    alt={"image"}
                    width={1000}
                    height={1000}
                    className="object-cover mt-4"
                  ></Image>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter>
          {props.createdAt < props.updatedAt && (
            <Badge variant={"outline"}>Edited</Badge>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default PostCard;
