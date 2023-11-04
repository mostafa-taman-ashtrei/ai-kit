import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI KIT",
  description: "One place for all of your A.I. needs from conversational ai to code generations you will find it all.",
};

interface props {
  children: React.ReactNode
}

const RootLayout: React.FC<props> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
