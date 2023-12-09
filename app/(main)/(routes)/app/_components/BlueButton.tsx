import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CreateButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <Button
      className={cn(
        "w-auto rounded-[0.5625rem] bg-tertiary px-[1rem] py-2.5 font-medium text-white hover:bg-tertiary/80",
        className,
      )}
      onClick={onClick}
      style={{ minWidth: "12ch" }}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
