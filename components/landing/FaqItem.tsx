"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function FaqItem({ question, answer, isOpen, onClick }: FaqItemProps) {
  return (
    <div 
      className="border-b border-gray-200 dark:border-gray-700 last:border-none bg-white dark:bg-gray-800 px-8"
      onClick={onClick}
    >
      <button
        className="flex justify-between items-center w-full py-8 text-left"
      >
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-4"
        >
          <IconChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-600 dark:text-gray-300 text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 