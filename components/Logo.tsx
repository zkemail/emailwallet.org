import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";
import Link from "next/link";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={"/"} className="relative h-16 w-[100px] md:h-20 md:w-[120px]">
      <ExportedImage
        src={resolvedTheme === "dark" ? "/logo.svg" : "/lightModeLogo.png"}
        alt={"logo"}
        className="object-cover"
        fill
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
