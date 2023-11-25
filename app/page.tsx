import { getServerSession } from "next-auth";

import React from "react";

import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "@/auth";
const Landing = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/feed");

  return (
    <div className="flex flex-col md:flex-row h-[75vh]">
      <div className="flex-1  flex flex-col justify-center items-center order-1">
        <h1 className="text-3xl font-bold">Reflection Sphere</h1>
        <p className="text-justify px-8 py-4">
          Welcome to ReflectionSphere - Where Ideas Converge and Thoughts
          Resonate. Dive into a world of boundless contemplation, where your
          musings find a home and thoughts intertwine.
        </p>
        <p className="text-justify px-8 py-4">
          Explore the depths of diverse perspectives, share reflections, and
          embark on an introspective journey within our immersive community.
          Discover the power of collective wisdom, where every notion finds its
          place in an ever-expanding sphere of knowledge.
        </p>
        <p className="text-justify px-8 py-4">
          Join us to connect, reflect, and articulate the essence of your
          thoughts. Step into ReflectionSphere and let your ideas resonate.
        </p>
      </div>
      <div className="flex-1 flex  justify-center items-center">
        <Image
          src={"/REFLECTION SPHERE.png"}
          alt={"Logo"}
          width={400}
          height={400}
        ></Image>
      </div>
    </div>
  );
};

export default Landing;
