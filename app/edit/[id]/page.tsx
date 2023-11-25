import EditPostForm from "@/components/EditPostForm";
import PostCard from "@/components/PostCard";
import prisma from "@/libs/db/prisma";

import React from "react";

const getPostById = async (id: string) => {
  const data = await prisma.post.findUnique({
    where: { id: id },
  });

  return data;
};

type EditParams = {
  id: string;
};

const Edit = async ({ params }: { params: EditParams }) => {
  const data = await getPostById(params.id);
  return (
    <div>
      <EditPostForm
        props={{
          content: data?.content!,
          id: data?.id!,
        }}
      />
    </div>
  );
};

export default Edit;
