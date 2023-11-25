"use server";

import { getServerSession } from "next-auth";
import prisma from "./db/prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/auth";

export const getDB = async () => {
  const session = await getServerSession(authOptions);
  const data = await prisma.post.findMany({
    where: {
      authorId: session?.user.id,
    },
    include: {
      author: { select: { name: true, image: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export const createPost = async (formdata: FormData, img: string) => {
  "use server";
  const session = await getServerSession(authOptions);

  const content = formdata.get("content")?.toString();
  const id = session?.user.id;

  if (!content || !id) throw new Error("Fields Invalid");

  const post = await prisma.post.create({
    data: {
      content,
      authorId: id,
      image: img,
    },
  });

  revalidatePath("/mypage");
};

export const getAllPost = async () => {
  const session = await getServerSession(authOptions);
  const data = await prisma.post.findMany({
    include: { author: { select: { image: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
  revalidatePath("/feed");
  return data;
};

export const deletePost = async (id: string) => {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/feed");
  revalidatePath("/mypage");
};

export const updatePost = async (formdata: FormData, id: string) => {
  const data = await prisma.post.update({
    where: { id: id },
    data: {
      content: formdata.get("content")?.toString(),
    },
  });

  revalidatePath("/mypage");

  return data;
};
