import { getServerSession } from "next-auth";

import React from "react";

import { redirect } from "next/navigation";
import Image from "next/image";
import { authOptions } from "@/lib/auth";
import LoginButton from "@/components/login/LoginButton";

const Landing = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/feed");

  return (
    <div className="flex flex-col md:flex-row -mx-96 h-screen">
      <div className="flex-1  flex flex-col justify-center items-center order-1">
        <LoginButton></LoginButton>
      </div>
      <div className="flex-1 md:flex  justify-center items-center hidden">
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
