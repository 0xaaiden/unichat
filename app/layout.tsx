import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Toaster from "./toaster";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatScan – Chat with On-Chain data using natural language",
  description:
    "Chat with Ethereum on-chain data using natural language. Built with OpenAI Functions and Vercel AI SDK.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      <Analytics />
    </html>
  );
}
