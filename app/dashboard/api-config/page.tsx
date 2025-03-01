"use client";

import ApiKeyForm from "@/components/ApiKeyForm";
import { motion } from "framer-motion";
import { IconKey, IconShieldLock, IconArrowUpRight } from "@tabler/icons-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ApiConfigPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">API Configuration</h1>
          <p className="text-gray-400">Configure your API keys for accessing AI features</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-400/10 to-emerald-400/5 p-6 border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-black/20">
                <IconKey className="w-6 h-6 text-emerald-400" />
              </div>
              <IconArrowUpRight className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-emerald-400">1</h3>
              <p className="text-sm text-gray-400">API Key Required</p>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-blue-400/10 to-blue-400/5 p-6 border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-black/20">
                <IconShieldLock className="w-6 h-6 text-blue-400" />
              </div>
              <IconArrowUpRight className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-blue-400">256</h3>
              <p className="text-sm text-gray-400">Bit Encryption</p>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-400/10 to-purple-400/5 p-6 border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-black/20">
                <IconKey className="w-6 h-6 text-purple-400" />
              </div>
              <IconArrowUpRight className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-purple-400">∞</h3>
              <p className="text-sm text-gray-400">Requests per day</p>
            </div>
          </motion.div>
        </div>

        {/* API Key Form Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
        >
          <div className="max-w-3xl">
            <ApiKeyForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
} 