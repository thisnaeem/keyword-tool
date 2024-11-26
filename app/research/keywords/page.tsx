"use client";

import { CategoryGrid } from "@/app/components/CategoryGrid";
import ExportButtons from "@/app/components/ExportButtons";
import { PageHeader } from "@/app/components/PageHeader";
import { useConfig } from "@/app/context/ConfigContext";
import { getGeminiInstance } from "@/app/lib/gemini";
import { exportToCSV, exportToPDF } from "@/app/utils/export";
import { IconPhoto, IconTrendingUp } from "@tabler/icons-react";
import { useRef, useState } from "react";


interface KeywordSuggestion {
  keyword: string;
  relevance: number;
  marketplace: "Adobe Stock" | "Shutterstock" | "Freepik";
}

interface PlatformLink {
  name: string;
  url: string;
  icon: React.ElementType;
}

const platformLinks: PlatformLink[] = [
  {
    name: "Adobe Stock",
    url: "https://stock.adobe.com/search?k=",
    icon: IconPhoto,
  },
  {
    name: "Shutterstock",
    url: "https://www.shutterstock.com/search/",
    icon: IconPhoto,
  },
  {
    name: "Freepik",
    url: "https://www.freepik.com/search?format=search&query=",
    icon: IconPhoto,
  },
];

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { apiKey } = useConfig();
  const [error, setError] = useState<string | null>(null);
  const [isFocused] = useState(false);

  const fetchKeywords = async (selectedCategory: string) => {
    if (!apiKey || !selectedCategory) return;

    setLoading(true);
    setError(null);
    try {
      const genAI = getGeminiInstance();
      const model = genAI?.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate a JSON array of 30 trending keywords for the category "${selectedCategory}" in microstock photography/illustration.
      For each keyword, analyze its potential across major marketplaces.
      Return as JSON array with format:
      [{"keyword": "string", "relevance": number 1-10, "marketplace": "Adobe Stock" | "Shutterstock" | "Freepik"}]
      
      Consider:
      - Current market trends
      - Seasonal relevance
      - Commercial viability
      - Search volume on these platforms
      
      Return ONLY the JSON array, no other text.`;

      const result = await model?.generateContent(prompt);
      const text = result?.response?.text();

      if (!text) {
        throw new Error("No response from AI");
      }

      // Clean the response text
      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\r\n\t]/g, "")
        .trim();

      try {
        const parsedKeywords = JSON.parse(cleanedText);

        // Validate the structure
        if (!Array.isArray(parsedKeywords)) {
          throw new Error("Response is not an array");
        }

        // Validate and sanitize each keyword object
        const validatedKeywords = parsedKeywords.map((kw) => ({
          keyword: String(kw.keyword),
          relevance: Number(kw.relevance),
          marketplace: String(kw.marketplace),
        }));

        setKeywords(validatedKeywords as KeywordSuggestion[]);
      } catch (parseError) {
        console.error("Raw AI response:", cleanedText, parseError);
        throw new Error("Failed to parse AI response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Error: ${errorMessage}`);
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    fetchKeywords(cat);
  };

  const handleCustomCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customCategory.trim()) {
      handleCategorySelect(customCategory.trim());
      setCustomCategory("");
      console.log("customCategory", customCategory);
      // inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };

  const handleExport = (type: "csv" | "pdf") => {
    const filename = `keywords-${new Date().toISOString().split("T")[0]}`;
    if (type === "csv") {
      exportToCSV(keywords, filename);
    } else {
      exportToPDF(keywords, filename);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Keyword Research" />
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 ">
          {error}
        </div>
      )}
      <div className="bg-white dark:bg-gray-800  shadow-lg p-6">
        <CategoryGrid
          handleCategorySelect={handleCategorySelect}
          category={category}
          customCategory={customCategory}
          handleCustomCategory={handleCustomCategory}
          inputRef={inputRef}
          isFocused={isFocused}
          handleInputChange={handleInputChange}
        />

        {loading ? (
          <div className="flex justify-center p-12 bg-white dark:bg-gray-800  shadow-lg">
            <div className="animate-spin  h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          keywords.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Trending Keywords for {category}
                </h2>
                <ExportButtons onExport={handleExport} />
              </div>
              <div className="grid gap-4 mt-8">
                {keywords.map((kw, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 space-y-4 md:space-y-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{kw.keyword}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {kw.marketplace}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <IconTrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">
                            Relevance: {kw.relevance}/10
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {platformLinks.map((platform) => (
                        <a
                          key={platform.name}
                          href={`${platform.url}${encodeURIComponent(
                            kw.keyword
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          <platform.icon className="w-4 h-4" />
                          {platform.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
