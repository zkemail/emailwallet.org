import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="relative h-12 w-20">
      <Image src={"/logo.png"} alt={"logo"} fill className="object-contain" />
    </Link>
  );
};

export default Logo;
