import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import ParallaxProvider from "@/provider/ParallaxProvider";

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
      <body className={cn(inter.className, "overflow-x-clip")}>
        <ParallaxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </ParallaxProvider>
      </body>
    </html>
  );
}
