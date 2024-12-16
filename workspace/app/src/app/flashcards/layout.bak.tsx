"use client";
import { type ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) 
{
  return (
    <html lang="de">
      <body>
        <h1>Root Layout from Flashcards</h1>
        {children}
      </body>
    </html>
  );
}
