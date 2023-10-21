import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParallaxProvider from "@/provider/ParallaxProvider";
import Head from "next/head";
import NewBlogPostHeader from "@/components/NewBlogPostHeader";
import StayUpToDate from "@/components/StayUpToDate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SendETH",
  description: "Email money to anyone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={cn(inter.className, "overflow-x-clip overflow-y-scroll")}
      >
        <ParallaxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NewBlogPostHeader />
            <Header />
            {children}
            <StayUpToDate />
          </ThemeProvider>
        </ParallaxProvider>
      </body>
    </html>
  );
}
