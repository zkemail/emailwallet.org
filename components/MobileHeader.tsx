"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import { LogOutIcon, Menu } from "lucide-react";
import { isSignedIn } from "@/lib/send";

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
}

const MobileHeader = ({ routes }: MobileHeaderProps) => {
  const router = useRouter();

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <nav className="mt-20 flex flex-col gap-1">
          {routes.map((route) => (
            <div
              key={route.name}
              className={cn(
                "rounded-md p-2 capitalize transition hover:bg-secondary",
                pathname === route.pathname &&
                  "rounded-md bg-slate-100 dark:bg-slate-900",
              )}
            >
              <a href={route.pathname} onClick={() => setIsOpen(false)}>
                {route.name}
              </a>
            </div>
          ))}
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
                variant: "outline",
                className: "flex font-semibold lg:hidden",
              }),
            )}
          >
            {signedInState ? "Logout" : "Try Demo"}
            {signedInState ? <LogOutIcon /> : null}
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
