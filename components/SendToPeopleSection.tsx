"use client";

import { motion } from "framer-motion";

const SendToPeopleSection = () => {
  return (
    <section className="mx-8 flex items-center overflow-x-clip max-md:text-end md:mx-10">
      <div className="mb-40 ml-auto flex flex-col gap-6 md:basis-[50%]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Send to people outside the system.
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          Send to anyone with an email address, whether or not they have an
          account with us yet.
        </motion.p>
      </div>
    </section>
  );
};

export default SendToPeopleSection;
