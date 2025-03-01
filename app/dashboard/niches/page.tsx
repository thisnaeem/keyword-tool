"use client";

import { useState } from "react";
import { getGeminiInstance } from "@/lib/gemini";
import { IconSearch, IconBulb, IconTrendingUp, IconChartBar, IconArrowUpRight, IconCategory, IconUsers, IconChartPie } from "@tabler/icons-react";
import { useConfig } from "@/context/ConfigContext";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Niche {
  category: string;
  trends: string[];
  potential: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const marketStats = [
  {
    name: "Analyzed Niches",
    value: "50+",
    description: "Analyzed niches across platforms",
    icon: IconCategory,
    color: "from-emerald-400/10 to-emerald-400/5",
    accentColor: "text-emerald-400"
  },
  {
    name: "Monthly Searches",
    value: "10K+",
    description: "Average monthly searches",
    icon: IconUsers,
    color: "from-blue-400/10 to-blue-400/5",
    accentColor: "text-blue-400"
  },
  {
    name: "Growth Rate",
    value: "25%",
    description: "Average monthly growth",
    icon: IconChartPie,
    color: "from-purple-400/10 to-purple-400/5",
    accentColor: "text-purple-400"
  }
];

export default function NichesPage() {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useConfig();

  const fetchNiches = async () => {
    if (!apiKey) {
      toast.error("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = getGeminiInstance();
      if (!genAI) throw new Error("Gemini AI not initialized");

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const prompt = `Generate a JSON array of 5 trending microstock content niches. Each object should have exactly these fields:
      - category (string): the niche category name
      - trends (array of strings): 2-3 current trends in this niche
      - potential (string): brief market potential description
      
      Focus on emerging markets and high-growth opportunities.
      Consider current market demands and future projections.
      Include specific trend data and growth indicators.

      Return ONLY a JSON array, no other text.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\r\n\t]/g, "")
        .trim();

      const parsedNiches = JSON.parse(cleanedText);

      if (!Array.isArray(parsedNiches)) {
        throw new Error("Response is not an array");
      }

      const validatedNiches = parsedNiches.map((niche) => ({
        category: String(niche.category),
        trends: niche.trends.map(String),
        potential: String(niche.potential),
      }));

      setNiches(validatedNiches);
      toast.success("Successfully found trending niches!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch niches";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Market Analysis</h1>
          <p className="text-gray-400">Discover trending niches and market opportunities</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search Section */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Niche Discovery</h2>
                <p className="text-gray-400">Find profitable niches with AI-powered market analysis</p>
              </div>
              <Button
                onClick={fetchNiches}
                disabled={loading}
                variant="default"
                isLoading={loading}
                leftIcon={<IconSearch className="w-5 h-5" />}
                glow
              >
                {loading ? "Analyzing Markets..." : "Find Trending Niches"}
              </Button>
            </div>
          </motion.div>

          {/* Results Section */}
          {loading ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="flex flex-col items-center justify-center p-12 space-y-4"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconBulb className="w-6 h-6 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-lg font-medium text-gray-200">Analyzing Markets</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                </div>
                <p className="text-sm text-gray-400 text-center max-w-sm">
                  Discovering profitable niches and market trends
                </p>
              </div>
            </motion.div>
          ) : niches.length > 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="grid gap-6"
            >
              {niches.map((niche, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  variants={fadeInUp}
                  className="rounded-2xl bg-gray-800/50 border border-white/5 p-6 hover:border-emerald-500/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                          <IconTrendingUp className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{niche.category}</h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Current Trends</h4>
                          <div className="flex flex-wrap gap-2">
                            {niche.trends.map((trend, tIndex) => (
                              <Button
                                key={tIndex}
                                variant="outline"
                                size="sm"
                                className="cursor-default"
                              >
                                {trend}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Market Potential</h4>
                          <p className="text-gray-300">{niche.potential}</p>
                        </div>
                      </div>
                    </div>
                    <IconChartBar className="w-6 h-6 text-emerald-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center"
            >
              <IconBulb className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-400 mb-2">Error</h3>
              <p className="text-gray-400">{error}</p>
            </motion.div>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="rounded-2xl bg-gray-800/50 border border-white/5 p-12 text-center"
            >
              <IconBulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-200 mb-2">Ready to Discover</h3>
              <p className="text-gray-400">
                Click the Search button to find trending niches and market opportunities
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
