"use client";

import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { ExternalLink, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isSignedIn } from "@/lib/send";

const routes = [
  { name: "docs", pathname: "http://emailwallet.org/docs", isExternal: true },
  { name: "about", pathname: "/about" },
  { name: "blog", pathname: "https://prove.email/blog", isExternal: true },
];

const Header = () => {
  const router = useRouter();

  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [signedInState, setSignedInState] = useState(false);

  const checkSignIn = async () => {
    const signedIn = await isSignedIn();
    setSignedInState(signedIn);
  };

  useEffect(() => {
    // Run once on load
    checkSignIn();

    window.addEventListener("storage", checkSignIn);
    window.addEventListener("local-storage", checkSignIn);

    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("storage", checkSignIn);
      window.removeEventListener("local-storage", checkSignIn);
    };
  }, []);

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
          <button
            onClick={() => {
              if (signedInState) {
                localStorage.clear();
                setSignedInState(false);
                return router.push("/");
              }
              router.push("/app");
            }}
            style={{ gap: "0.5rem" }}
            className={cn(
              buttonVariants({
                className: "hidden px-6 md:flex",
              }),
              "bg-tertiary text-primary hover:bg-tertiary/80",
            )}
          >
            {signedInState ? "Logout" : "Try Demo"}
            {signedInState ? <LogOutIcon /> : null}
          </button>
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
