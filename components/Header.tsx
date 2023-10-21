"use client";

import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const routes = [
  { name: "docs", pathname: "https://docs.sendeth.org", isExternal: true },
  { name: "about", pathname: "/about" },
  { name: "blog", pathname: "/blog" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="sticky mt-7 bg-transparent">
      <div className="flex w-full items-center justify-between px-4 py-1">
        <Logo />
        <nav className="hidden gap-4 md:flex">
          {routes.map((route) => (
            <a
              className={cn(
                buttonVariants({ variant: "ghost", className: "capitalize" }),
                pathname === route.pathname && "rounded-md bg-secondary",
              )}
              key={route.name}
              href={route.pathname}
              target={route.isExternal ? "_blank" : ""}
            >
              {route.name}
            </a>
          ))}
          <a
            href={"https://github.com/zkemail/sendeth"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center gap-1",
            )}
          >
            Github
            <ExternalLink size={20} />
          </a>
          <a
            href={"/app"}
            className={cn(
              buttonVariants({
                className: "hidden px-6 md:flex",
              }),
              "bg-tertiary text-primary hover:bg-tertiary/80",
            )}
          >
            Try Demo
          </a>
          <ModeToggle />
        </nav>
        <div className="flex items-center gap-x-2 md:hidden">
          <ModeToggle />
          <MobileHeader routes={routes} />
        </div>
      </div>
    </header>
  );
};

export default Header;
