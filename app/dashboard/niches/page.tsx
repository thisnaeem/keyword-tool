"use client";

import { useState, useEffect } from "react";
import { getGeminiInstance } from "@/lib/gemini";
import { PageHeader } from "@/components/PageHeader";
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

  useEffect(() => {
    if (apiKey) {
      fetchNiches();
    }
  }, [apiKey]);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Trending Niches" />
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
        {error ? (
          <div className="text-red-500 p-4  bg-red-50 dark:bg-red-900/30">
            {error}
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin  h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="grid gap-6">
                {niches.map((niche, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 ">
                    <h3 className="font-semibold text-xl text-primary">
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
            )}
            <button
              onClick={fetchNiches}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              Refresh Niches
            </button>
          </>
        )}
      </div>
    </div>
  );
}
