"use client";
import { State } from "@/hooks/useEngine";
import { motion } from "framer-motion";
import React from "react";

const Results = ({
  errors,
  accuracy,
  total,
  className,
  state,
}: {
  errors: number;
  accuracy: number;
  total: number;
  className?: string;
  state: State;
}) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.2 };
  if (state !== "finish") {
    return null;
  }
  return (
    <motion.ul
      className={` flex flex-col items-center text-yellow-400 gap-y-3 ${className} `}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-xl font-semibold text-lime-400 "
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500 font-semibold"
      >
        Errors:{errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed:{total}
      </motion.li>
    </motion.ul>
  );
};

export default Results;
