"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const StayUpToDate = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  return (
    <section className="mx-auto flex w-4/5 flex-col items-center justify-center gap-10 overflow-clip px-4 pb-20 max-md:gap-10 md:px-32 md:pb-28 lg:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col items-center gap-y-10 max-lg:text-center lg:items-start">
          <div className="flex flex-col items-center gap-y-3 md:gap-x-2 lg:flex-row">
            <Mail size={60} />
            <h1 className="text-4xl font-bold text-primary">Stay Tuned</h1>
          </div>

          <p className="w-full text-muted-foreground lg:w-4/5">
            Subscribe and stay up-to-date on the latest developer news
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-1 flex-col items-center gap-4 lg:mt-8">
        <div className="flex w-full flex-col gap-3 lg:flex-row">
          <Input
            type="text"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="w-full"
            placeholder="First name"
          />
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full"
            placeholder="Email Address"
          />
        </div>
        <Button className="w-full rounded-full">Subscribe</Button>
        <span className="text-center text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </span>
      </div>
      <motion.div
        transition={{ repeat: Infinity, duration: 3 }}
        animate={{ y: [0, 10, 0], x: [0, 20, 0] }}
        className="absolute -z-10 h-[400px] w-[400px] rounded-full border border-primary bg-tertiary/70 transition-all max-md:hidden md:-left-[30%] md:top-[210%] lg:-left-[15%] lg:top-[180%]"
      />
      <span className="absolute right-[8%] top-[190%] hidden rotate-12 font-mono text-xl font-semibold text-slate-300 dark:text-slate-600 md:block">
        Az x Bz = Cz
      </span>
    </section>
  );
};

export default StayUpToDate;
