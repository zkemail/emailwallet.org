import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BlueButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <Button
      style={{
        background: `linear-gradient(180deg, #4D94FF 0%, #1766DC 100%)`,
      }}
      className={cn(
        "rounded-[0.5625rem] px-[1.1875rem] py-2.5 font-medium text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BlueButton;
