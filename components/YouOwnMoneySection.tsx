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
        <p className="text-sm text-muted-foreground">
          We can&apos;t steal your funds, they can only be authorized by your
          email.
        </p>
      </div>
      <div className="z-back absolute right-1/4 mt-56 h-32 w-32">
        {resolvedTheme === "light" ? (
          <ExportedImage src={"/emailLightMode.svg"} alt={"email"} fill />
        ) : (
          <ExportedImage src={"/emailDarkMode.svg"} alt={"email"} fill />
        )}
      </div>
    </section>
  );
};

export default YouOwnMoneySection;
