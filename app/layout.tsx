"use client";

import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import ClientSideLogic from './ClientSideLogic'; // Import the new client component
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParallaxProvider from "@/components/provider/ParallaxProvider";
import Head from "next/head";
import NewBlogPostHeader from "@/components/NewBlogPostHeader";
import Footer from "@/components/Footer";
import { setAccountCode } from "@/lib/send";
import useQueryParams from "@/hooks/useQueryParams";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Email Wallet",
//   description: "Email money to anyone.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useQueryParams();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.className, "overflow-x-clip overflow-y-scroll")}
      >
        <ParallaxProvider>
          <Toaster
            toastOptions={{
              duration: 5000,
              style: {
                fontSize: "12px",
              },
            }}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NewBlogPostHeader />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </ParallaxProvider>
      </body>
    </html>
  );
}
