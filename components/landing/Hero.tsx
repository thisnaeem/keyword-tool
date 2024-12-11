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
    <div className="relative overflow-hidden pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Create high-performing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#97ef39] to-[#7bc62d]">
              microstock content in minutes
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Generate a steady flow of profitable content ideas with AI-powered research tools.
            No guesswork required - just data-driven insights for microstock success.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <LoginButtons session={session} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#97ef39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#97ef39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#97ef39]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Expert support</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Card Stack Effect */}
          <div className="relative flex items-center justify-center">
            {/* Background Cards */}
            <div className="absolute -left-4 top-4 w-full h-[500px] bg-red-400/20 rounded-3xl transform -rotate-6" />
            <div className="absolute -right-4 top-4 w-full h-[500px] bg-blue-400/20 rounded-3xl transform rotate-6" />
            
            {/* Main Card */}
            <div className="relative w-full bg-[#97ef39]/10 rounded-3xl p-12 backdrop-blur-sm border border-[#97ef39]/20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-left">
                  <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                    Source Content
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Get highly profitable content ideas at the touch of a button and revolutionize your microstock earnings.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-8 py-4 text-black bg-[#97ef39] hover:bg-[#88d633] rounded-lg text-lg"
                  >
                    Learn more
                    <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>

                {/* Right Content - Dashboard Image */}
                <div className="relative h-[600px]">
                  <Image
                    src="/dash.png"
                    alt="Dashboard Preview"
                    width={800}
                    height={600}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-xl border border-gray-200 dark:border-gray-700"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 