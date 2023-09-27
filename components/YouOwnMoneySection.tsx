"use client";

import ExportedImage from "next-image-export-optimizer";
import { useTheme } from "next-themes";
import { motion, useScroll } from "framer-motion";

const YouOwnMoneySection = () => {
  const { resolvedTheme } = useTheme();
  const { scrollXProgress, scrollY } = useScroll();

  return (
    <section className="mx-8 mb-60 mt-32 flex max-w-screen-lg items-center md:mx-20 md:my-60">
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
        style={{ x: scrollXProgress }}
        className="absolute -bottom-[100px] right-1/4 -z-10 h-32 w-32 md:-bottom-[250px] md:right-1/4 md:mt-20"
      >
        {resolvedTheme === "light" ? (
          <ExportedImage src={"/emailLightMode.svg"} alt={"email"} fill />
        ) : (
          <ExportedImage src={"/emailDarkMode.svg"} alt={"email"} fill />
        )}
      </motion.div>
    </section>
  );
};

export default YouOwnMoneySection;
