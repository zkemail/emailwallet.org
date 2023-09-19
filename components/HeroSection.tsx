"use client";

import ExportedImage from "next-image-export-optimizer";
import { Button } from "./ui/button";
import AirplaneImages from "./AirplaneImages";
import Balls from "./Balls";
import { TypingText } from "./TypingText";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section className="mx-6 mt-32 flex md:mx-20">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <ExportedImage
          src={
            resolvedTheme === "dark"
              ? "/darkherobackground.png"
              : "/transparent-hero-bg.png"
          }
          alt={"background image"}
          fill
          className="hidden object-fill md:block"
          loading="eager"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-10 md:flex-row">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col items-start gap-y-6 xl:gap-y-10"
        >
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl md:leading-tight">
            Email money to{" "}
            <TypingText
              className="w-fit rounded-xl bg-tertiary px-2"
              title={"anyone."}
            />
          </h1>
          <h3 className="text-lg text-muted-foreground">
            We use zk proofs to ensure you own your money.
          </h3>
          <div className="flex gap-4">
            <Button className="rounded-lg bg-tertiary px-8 text-primary hover:bg-tertiary-foreground">
              Try Demo
            </Button>
            <Button className="rounded-lg border-2 px-8" variant={"outline"}>
              Read Docs
            </Button>
          </div>
        </motion.div>

        {/* Balls and airplanes images */}
        <Balls />
        <AirplaneImages />
      </div>
    </section>
  );
};

export default HeroSection;
