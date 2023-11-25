import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import prisma from "@/libs/db/prisma";
import { getServerSession } from "next-auth";
import React from "react";

import { redirect } from "next/navigation";
import { Post, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getDB } from "@/libs/dbActions";
import ListEmpty from "@/components/ListEmpty";
import { Metadata } from "next";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "My Page | Reflection Sphere",
};

const MyPage = async () => {
  const session = await getServerSession(authOptions);

  const data = await getDB();

  if (!session) redirect("/");

  console.log(session?.user.id, session.user.name);

  return (
    <div>
      <CreatePost></CreatePost>
      <h2 className="text-2xl font-bold text-center mt-8">MY POST</h2>

      <div className="grid grid-cols-1 gap-2">
        {data.length != 0 ? (
          data.map(
            (
              d: Prisma.PostGetPayload<{
                include: { author: { select: { name: true; image: true } } };
              }>
            ) => {
              return <PostCard key={d.id} props={d}></PostCard>;
            }
          )
        ) : (
          <ListEmpty />
        )}
      </div>
    </div>
  );
};

export default MyPage;
