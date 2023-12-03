import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

import { redirect } from "next/navigation";
import CreatePost from "@/components/create-post/CreatePost";
import PostCard from "@/components/PostCard";
import { getAllPost } from "@/lib/dbActions";
import ListEmpty from "@/components/ListEmpty";
import { Metadata } from "next";
import { authOptions } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export const metadata: Metadata = {
  title: "Feed | Reflection Sphere",
};

const Feed = async () => {
  const session = await getServerSession(authOptions);

  const data = await getAllPost();

  if (!session) redirect("/");
  return (
    <div>
      <h2 className="text-2xl font-bold text-center pt-28 pb-8">FEED</h2>

      <div className="grid grid-cols-1 gap-2">
        <Suspense fallback={<LoadingSkeleton />}>
          {data.length != 0 ? (
            data.map((d) => {
              return <PostCard key={d.id} props={d}></PostCard>;
            })
          ) : (
            <ListEmpty />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Feed;
