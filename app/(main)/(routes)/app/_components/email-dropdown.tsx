import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaYahoo } from "react-icons/fa";
import { TbBrandGmail } from "react-icons/tb";

interface EmailDropdownProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "center" | "start" | "end";
  buttonClassName?: string;
  contentClassName?: string;
}

export const EmailDropdown = ({
  children,
  buttonClassName,
  contentClassName,
  side = "top",
  align = "start",
}: EmailDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-0">
        <Button className={buttonClassName}>{children}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={contentClassName}
        side={side}
        align={align}
      >
        <DropdownMenuLabel>Email Providers</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <TbBrandGmail className="mr-2" /> Gmail
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FaYahoo className="mr-2" /> Yahoo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
