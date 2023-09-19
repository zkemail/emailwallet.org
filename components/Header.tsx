"use client";

import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

const routes = [
  { name: "about", pathname: "/about" },
  { name: "blog", pathname: "/blog" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-transparent">
      <div className="flex w-full items-center justify-between px-4 py-4">
        <Logo />
        <nav className="hidden gap-4 md:flex">
          {routes.map((route) => (
            <Link
              className={cn(
                "rounded-md p-2 capitalize transition hover:bg-secondary",
                pathname === route.pathname && "rounded-md bg-secondary",
              )}
              key={route.name}
              href={route.pathname}
            >
              {route.name}
            </Link>
          ))}
          <Link
            href={"#"}
            className={cn(
              buttonVariants({
                className: "hidden px-6 md:flex",
              }),
            )}
          >
            Try Demo
          </Link>
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
