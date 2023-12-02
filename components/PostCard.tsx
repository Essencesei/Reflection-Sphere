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
import { getComments, getPostById } from "@/lib/dbActions";
import LikeButton from "./LikeButton";
import ImageVideoContainer from "./ImageVideoContainer";
import CommentForm from "./comment/CommentForm";
import CommentList from "./comment/CommentList";

type PostCardProps = Prisma.PostGetPayload<{
  include: { author: { select: { name: true; image: true } } };
}>;

const PostCard = async ({ props }: { props: PostCardProps }) => {
  const session = await getServerSession(authOptions);
  const comments = await getComments(props.id);

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
                        <EditPostForm
                          props={{ content: props.content, id: props.id }}
                        ></EditPostForm>
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
                  <ImageVideoContainer
                    props={{
                      url: props.image,
                      height: 300,
                      width: 300,
                      className: "aspect-square",
                    }}
                  ></ImageVideoContainer>
                )}
              </DialogTrigger>
              <DialogContent className=" max-w-[475px] flex justify-center items-center">
                {props.image && (
                  <ImageVideoContainer
                    props={{ url: props.image, height: 1000, width: 1000 }}
                  ></ImageVideoContainer>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter>
          <LikeButton
            props={{ id: props.id, userid: session?.user.id as string }}
            buttonState={{
              liked: props.likersId.includes(session?.user.id as string),
            }}
          />
          <Badge variant={"outline"} className="border-none">
            {props.likersId.length === 0
              ? "Be the first to like this post"
              : props.likersId.length === 1
              ? `${props.likersId.length} people liked this post`
              : `${props.likersId.length} peoples liked this post`}
          </Badge>
        </CardFooter>
        <CommentForm props={{ authorId: session?.user.id, postId: props.id }} />

        <div className="pl-8 p-4 flex flex-col gap-2 max-h-[400px] overflow-y-scroll">
          <span>Comments</span>
          <CommentList props={comments}></CommentList>
        </div>
      </Card>
    </>
  );
};

export default PostCard;
