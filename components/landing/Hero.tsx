"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import LoginButtons from "./LoginButtons";
import { Session } from "next-auth";

interface HeroProps {
  session: Session | null;
}

export default function Hero({ session }: HeroProps) {
  return (
    <div className="relative overflow-hidden pt-40 pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-[#97ef39]/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-[#97ef39]/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#97ef39] to-[#7bc62d]">
              Microstock Content Planner
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Your all-in-one platform for researching, planning, and optimizing
            your microstock content strategy across multiple platforms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LoginButtons session={session} />
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="relative">
            {/* Dashboard Image */}
            <div className="overflow-hidden shadow-2xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-800">
              <Image
                src="/dash.png"
                alt="Dashboard Preview"
                width={2000}
                height={1200}
                className="w-full h-auto"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
            </div>

            {/* Floating Features */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 flex-wrap justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#97ef39] rounded-full" />
                <span className="text-sm font-medium">Real-time Analytics</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#97ef39] rounded-full" />
                <span className="text-sm font-medium">Trend Insights</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-[#97ef39] rounded-full" />
                <span className="text-sm font-medium">Smart Planning</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 