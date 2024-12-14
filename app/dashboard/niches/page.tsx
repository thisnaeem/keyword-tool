"use client";

import { useState } from "react";
import { getGeminiInstance } from "@/lib/gemini";
import { IconSearch, IconBulb } from "@tabler/icons-react";
import { useConfig } from "@/context/ConfigContext";

interface Niche {
  category: string;
  trends: string[];
  potential: string;
}

export default function NichesPage() {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useConfig();

  const fetchNiches = async () => {
    if (!apiKey) {
      setError("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = getGeminiInstance();
      if (!genAI) {
        throw new Error("Gemini AI not initialized");
      }

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate a JSON array of 5 trending microstock content niches. Each object should have exactly these fields:
      - category (string): the niche category name
      - trends (array of strings): 2-3 current trends in this niche
      - potential (string): brief market potential description
      
      Respond ONLY with the JSON array, no other text. Example format:
      [{"category": "Health Tech", "trends": ["Remote Health", "AI Diagnostics"], "potential": "High growth"}]`;

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
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch niches"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={fetchNiches}
            disabled={loading}
            className="px-6 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 
            transition-colors duration-300 flex items-center gap-2 relative overflow-hidden group"
          >
            <IconSearch className="w-5 h-5 text-white relative z-10" />
            <span className="text-white font-medium relative z-10">
              {loading ? "Searching..." : "Find Trending Niches"}
            </span>
            <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {error && (
          <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/30 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-700 border-t-[#97ef39] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <IconBulb className="w-6 h-6 text-[#97ef39] animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-lg font-medium text-gray-200">Discovering Trends</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#97ef39] animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-[#97ef39] animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-[#97ef39] animate-bounce" />
              </div>
              <p className="text-sm text-gray-400 text-center max-w-sm">
                Analyzing market trends and opportunities
              </p>
            </div>
          </div>
        ) : niches.length > 0 ? (
          <div className="grid gap-6">
            {niches.map((niche, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6">
                <h3 className="font-semibold text-xl text-[#97ef39]">
                  {niche.category}
                </h3>
                <ul className="mt-3 space-y-2">
                  {niche.trends.map((trend, tIndex) => (
                    <li key={tIndex} className="flex items-center">
                      <span className="mr-2">•</span>
                      {trend}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Potential: {niche.potential}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            Click the Search button to discover trending niches
          </div>
        )}
      </div>
    </div>
  );
}
