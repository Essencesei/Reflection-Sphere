import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navigation from "@/components/Navigation";
import { getServerSession } from "next-auth";

import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { authOptions } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reflection Sphere",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html data-theme="light" lang="en">
      <body className={inter.className}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <SessionProvider>
          <Navigation session={session}></Navigation>

          <main className="m-4 min-h-screen">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
