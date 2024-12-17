import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider, ThemeToggle } from "@/components/ui/theme";
import { cn } from "@/lib/utils";
import InvalidateQueriesProvider from "@/provider/appRouterSpecific/InvalidateQueriesProvider";
import { TRPCReactProvider } from "@/trpc/react";

import { env } from "@constellatio/env";
import type { Metadata, Viewport } from "next";
// test
import React from "react";
/* import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans"; */

import "@/styles/globals.css";

/* import Header from "./_components/layouts/global/header"; */

export const metadata: Metadata = {
  description: "Simple monorepo with shared backend for web & mobile apps",

  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000"
  ),
  openGraph: {
    description: "Simple monorepo with shared backend for web & mobile apps",
    siteName: "Create T3 Turbo",
    title: "Create T3 Turbo",
    url: "https://create-t3-turbo.vercel.app",
  },
  title: "Create T3 Turbo",
  twitter: {
    card: "summary_large_image",
    creator: "@jullerino",
    site: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
};

/* export const experimental_ppr = true; */

export default function RootLayout(props: {
  readonly children: React.ReactNode;
}) 
{
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased"
          /* GeistSans.variable,
          GeistMono.variable, */
        )}>
        {/* TODO: outsource the providers to a single file */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <InvalidateQueriesProvider>
              {props.children}
            </InvalidateQueriesProvider>
          </TRPCReactProvider>
          {/* <div className="absolute bottom-4 right-4">
            <ThemeToggle/>
          </div> */}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
