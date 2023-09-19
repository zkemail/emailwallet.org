import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-12 w-20">
      <ExportedImage
        src={"/logo.png"}
        alt={"logo"}
        className="object-contain"
        fill
      />
    </Link>
  );
};

export default Logo;
