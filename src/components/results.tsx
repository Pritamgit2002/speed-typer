import { AnimatePresence, motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import { formatPercentage } from "../utils/helpers";
import { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

const Results = ({
  state,
  errors,
  accuracyPercentage,
  total,
  wpm,
  onRestart: handleRestart,
  className = "",
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  wpm: number;
  onRestart: () => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (state === "finish") {
      setIsOpen(true);
    }
  }, [state]); // Only run when `state` changes

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const handleClick = () => {
    setIsOpen(false);
    handleRestart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {/* <FaFire className="text-yellow-400/25 rotate-12 text-[150px] absolute z-0 -top-4 -left-8" /> */}
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-yellow-500 grid place-items-center mx-auto">
                <FaFire />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">Score</h3>
              <p className="text-center font-medium mb-6">
                It's like thunder in your fingertips...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleClick}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-3/4 py-2 rounded mx-auto "
                >
                  Try Again
                </button>
              </div>
              <motion.ul
                initial={initial}
                animate={animate}
                className={`flex flex-col items-center text-primary-400 space-y-3 font-semibold text-xl ${className}`}
              >
                <motion.li
                  initial={initial}
                  animate={animate}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="text-lime-400"
                >
                  Accuracy: {formatPercentage(accuracyPercentage)}
                </motion.li>
                <motion.li
                  initial={initial}
                  animate={animate}
                  transition={{ duration: 0.3, delay: 1 }}
                  className="text-red-500"
                >
                  Errors: {errors}
                </motion.li>
                <motion.li
                  initial={initial}
                  animate={animate}
                  transition={{ duration: 0.3, delay: 1.5 }}
                  className="text-yellow-400"
                >
                  Wpm: {wpm}
                </motion.li>
                <motion.li
                  initial={initial}
                  animate={animate}
                  transition={{ duration: 0.3, delay: 2 }}
                >
                  Typed: {total}
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Results;
