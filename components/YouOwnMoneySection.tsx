"use client";

import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const YouOwnMoneySection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1060px)");
  const isSmallScreen = useMediaQuery("(min-width: 500px)");

  const { resolvedTheme } = useTheme();
  // const { scrollXProgress, scrollY } = useScroll();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="mx-8 mb-60 mt-32 flex items-center md:mx-10 md:my-60">
      <div className="flex flex-col gap-6">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          You own your money.
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          We can&apos;t steal your funds, they can only be authorized by your
          email.
        </motion.p>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0.5, x: 150 },
          visible: {
            opacity: 1,
            x: isLargeScreen ? -550 : -350,
            y: 250,
            rotateX: 180,
            rotate: 30,
          },
        }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 2 }}
        className="absolute -z-10 h-40 w-40 max-md:hidden md:-bottom-[180px] md:right-1/4"
      >
        <ExportedImage
          src={
            resolvedTheme === "dark"
              ? "/emailDarkMode.svg"
              : "/emailLightMode.svg"
          }
          alt={"email"}
          fill
        />
      </motion.div>

      {/* Small screen image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0.5, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            rotateX: 180,
            rotate: 30,
          },
        }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1 }}
        className={cn(
          "absolute -bottom-[250px] right-1/3 -z-10 h-32 w-32 md:hidden",
          isSmallScreen && "-bottom-[140px]",
        )}
      >
        <ExportedImage
          src={
            resolvedTheme === "dark"
              ? "/emailDarkMode.svg"
              : "/emailLightMode.svg"
          }
          alt={"email"}
          fill
        />
      </motion.div>
    </section>
  );
};

export default YouOwnMoneySection;
