import { getServerSession } from "next-auth";
import React from "react";

import { redirect } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { getAllPost } from "@/libs/dbActions";
import ListEmpty from "@/components/ListEmpty";
import { Metadata } from "next";
import { authOptions } from "@/auth";

export const metadata: Metadata = {
  title: "Feed | Reflection Sphere",
};

const Feed = async () => {
  const session = await getServerSession(authOptions);

  const data = await getAllPost();

  if (!session) redirect("/");
  return (
    <div>
      <CreatePost></CreatePost>
      <h2 className="text-2xl font-bold text-center mt-8">FEED</h2>
      <div className="grid grid-cols-1 gap-2">
        {data.length != 0 ? (
          data.map((d) => {
            return <PostCard key={d.id} props={d}></PostCard>;
          })
        ) : (
          <ListEmpty />
        )}
      </div>
    </div>
  );
};

export default Feed;
