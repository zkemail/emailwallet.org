"use client";

import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const routes = [
  { name: "docs", pathname: "http://docs.emailwallet.org", isExternal: true },
  { name: "about", pathname: "/about" },
  { name: "blog", pathname: "https://prove.email/blog", isExternal: true },
];

const Header = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <header className="sticky bg-transparent">
      <div className="flex w-full items-center justify-between px-4 py-1">
        <Logo />
        <nav className="hidden gap-4 md:flex">
          {routes.map((route) => (
            <div key={route.pathname}>
              <a
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "capitalize",
                  }),
                  pathname === route.pathname && "rounded-md bg-secondary",
                )}
                target={route.isExternal ? "_blank" : "_self"}
                href={route.pathname}
              >
                {route.name}
              </a>
            </div>
          ))}
          <Link
            href={"https://github.com/zkemail/email-wallet"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center gap-1",
            )}
            target="_blank"
          >
            Github
            <ExternalLink size={20} />
          </Link>
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
