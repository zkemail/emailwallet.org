import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ClickButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className, disabled }) => {
  return (
    <Button
      className={cn(
        "w-auto rounded-[0.5625rem] bg-tertiary px-[1rem] py-2.5 font-medium text-white hover:bg-tertiary/80",
        className,
      )}
      onClick={onClick}
      style={{ minWidth: "12ch" }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default ClickButton;
