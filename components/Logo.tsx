import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";
import Link from "next/link";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Link href={"/"} className="relative h-20 w-28">
      <ExportedImage
        src={resolvedTheme === "dark" ? "/logo.png" : "/light_mode_logo.png"}
        alt={"logo"}
        className="object-cover"
        fill
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
