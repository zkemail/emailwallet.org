"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ExternalLink } from "lucide-react";

const routes = [
  { name: "create", pathname: "/create", isExternal: false },
  { name: "send", pathname: "/app", isExternal: false },
  { name: "withdraw", pathname: "/withdraw" },
  { name: "deposit", pathname: "/deposit" },
];

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="justify-center gap-4 py-6 text-lg md:flex">
      {routes.map((route) => (
        <Link legacyBehavior key={route.name} href={route.pathname}>
          <a
            className={cn(
              buttonVariants({ variant: "ghost", className: "capitalize" }),
              pathname === route.pathname && "active-link",
            )}
          >
            {route.name}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
