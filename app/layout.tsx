import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { CrispProvider } from "@/providers/CrispProvider";
import type { Metadata } from "next";
import { ModalProvider } from "@/providers/ModalProvider";
import NextThemeProvider from "@/providers/NextThemeProvider";
import ToasterProvider from "@/providers/ToastProvider";

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
        <CrispProvider />
        <body className="">
          <NextThemeProvider>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
