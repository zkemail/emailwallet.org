import { cn } from "@/lib/utils";

const Triangle = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border-[10px] border-b-[15px] border-t-0 border-transparent border-b-red-500",
        className,
      )}
    />
  );
};

export default Triangle;
