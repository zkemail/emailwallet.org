"use client";

import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";

const YouOwnMoneySection = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="mx-20 my-60 flex max-w-screen-lg items-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-semibold md:text-4xl">
          You own your money.
        </h1>
        <p className="text-sm">
          We can&apos;t steal your funds, they can only be authorized by your
          email.
        </p>
      </div>
      <div className="absolute right-1/4 h-32 w-32">
        <ExportedImage
          src={
            resolvedTheme === "light"
              ? "/emailLightMode.svg"
              : "/emailDarkMode.svg"
          }
          alt={"email"}
          fill
        />
      </div>
    </section>
  );
};

export default YouOwnMoneySection;
