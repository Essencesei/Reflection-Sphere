import { Prisma } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { timeFormatter } from "@/lib/timeFormatter";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type CommentListProps = {
  props: Array<
    Prisma.CommentGetPayload<{
      include: { author: { select: { name: true; image: true } } };
    }>
  >;
};

const CommentList = ({ props }: CommentListProps) => {
  return (
    <>
      {props.map(
        (
          el: Prisma.CommentGetPayload<{
            include: { author: { select: { name: true; image: true } } };
          }>
        ) => {
          return (
            <Card key={el.id}>
              <CardHeader>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {el?.author?.name?.slice(0, 1)}
                    </AvatarFallback>
                    <AvatarImage src={el?.author?.image!}></AvatarImage>
                  </Avatar>
                  <CardDescription>
                    <span className="flex flex-col">
                      <span className="text-md"> {el?.author?.name}</span>
                      <span> {timeFormatter(el?.createdAt)}</span>
                    </span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <span>{el?.comment}</span>
              </CardContent>
            </Card>
          );
        }
      )}
    </>
  );
};

export default CommentList;
