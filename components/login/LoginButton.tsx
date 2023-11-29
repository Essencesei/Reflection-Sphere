"use client";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      disabled={loading}
      onClick={() => {
        signIn("google", { callbackUrl: "/feed" });
        setLoading(true);
      }}
    >
      {loading ? (
        <span className="flex gap-4">
          <Loader2 className="animate-spin"></Loader2> Please wait
        </span>
      ) : (
        <span> Login with Google</span>
      )}
    </Button>
  );
};

export default LoginButton;
