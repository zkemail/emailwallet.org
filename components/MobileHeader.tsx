"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
}

const MobileHeader = ({ routes }: MobileHeaderProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
          <a
            href={"/app"}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "flex font-semibold lg:hidden",
              }),
            )}
          >
            Try Demo
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;
