import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-20 w-28">
      <ExportedImage
        src={"/logo.png"}
        alt={"logo"}
        className="object-cover"
        fill
      />
    </Link>
  );
};

export default Logo;
