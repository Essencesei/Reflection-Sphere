"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";

type CredButtonProps = {
  session: Session | null;
};

const CredButton = ({ session }: CredButtonProps) => {
  return (
    <div>
      {session ? (
        <button onClick={() => signOut()} className="btn btn-primary">
          Log Out
        </button>
      ) : (
        <button onClick={() => signIn()} className="btn btn-primary">
          Sign In
        </button>
      )}
    </div>
  );
};

export default CredButton;
