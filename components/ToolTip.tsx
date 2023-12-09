import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ToolTip = ({
  children,
  text,
  side,
}: {
  children: React.ReactNode;
  text: string;
  side?: "top" | "right" | "bottom" | "left";
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
