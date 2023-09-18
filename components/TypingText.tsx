"use client";

import { textContainer, textVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const TypingText = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <motion.p variants={textContainer} className={cn("", className)}>
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);
