"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import CredButton from "./CredButton";
import Link from "next/link";

type NavigationProps = {
  session: Session | null;
};

const Navigation = ({ session }: NavigationProps) => {
  return (
    <div className="navbar flex justify-between  ">
      <Link href={"/feed"} className="flex gap-2">
        <Image
          src={"/REFLECTION SPHERE.png"}
          alt={"logo"}
          width={40}
          height={40}
        ></Image>
        <h1 className="text-xl font-bold">Reflection Sphere</h1>
      </Link>
      <div className="dropdown dropdown-end">
        <label tabIndex={0}>
          {session ? (
            <Image
              className="rounded-full btn btn-circle btn-ghost"
              src={session?.user.image!}
              alt={session?.user.name!}
              width={40}
              height={40}
            ></Image>
          ) : (
            <CredButton session={session} />
          )}
        </label>
        <div className=" dropdown dropdown-content bg-base-200 w-[250px] mt-14 rounded-md shadow-md p-4">
          <ul tabIndex={1}>
            {session && (
              <>
                <li className="w-full text-center font-bold">
                  Hello! {session.user.name}!
                </li>
                <li>
                  <Link href={"/feed"} className="btn btn-ghost w-full">
                    Feed
                  </Link>
                </li>
                <li>
                  <Link href={"/mypage"} className="btn btn-ghost w-full">
                    My Post
                  </Link>
                </li>

                <li className="">
                  <button
                    className="btn btn-ghost w-full"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
