"use client";

import { useState, useRef } from "react";
import { getGeminiInstance } from "@/app/lib/gemini";
import { useConfig } from "@/app/context/ConfigContext";
import {
  IconSearch,
  IconPhoto,
  IconTrendingUp,
  IconBriefcase,
  IconTree,
  IconDevices,
  IconHeart,
  IconCup,
  IconHeartbeat,
  IconSchool,
  IconPlane,
  IconBarbell,
  IconUsers,
  IconBuilding,
  IconHanger,
  IconAtom,
  IconLeaf,
  IconMovie,
  IconPaw,
  IconCoin,
  IconPalette,
} from "@tabler/icons-react";
import { ExportButtons } from "@/app/components/ExportButtons";
import { PageHeader } from "@/app/components/PageHeader";
import { exportToCSV, exportToPDF } from "@/app/utils/export";

interface KeywordSuggestion {
  keyword: string;
  relevance: number;
  marketplace: "Adobe Stock" | "Shutterstock" | "Freepik";
}

interface PlatformLink {
  name: string;
  url: string;
  icon: React.ComponentType;
}

const suggestedCategories = [
  { name: "Business & Work", icon: IconBriefcase },
  { name: "Nature & Landscapes", icon: IconTree },
  { name: "Technology", icon: IconDevices },
  { name: "Lifestyle", icon: IconHeart },
  { name: "Food & Drink", icon: IconCup },
  { name: "Health & Wellness", icon: IconHeartbeat },
  { name: "Education", icon: IconSchool },
  { name: "Travel", icon: IconPlane },
  { name: "Sports & Fitness", icon: IconBarbell },
  { name: "Family & Relationships", icon: IconUsers },
  { name: "Architecture", icon: IconBuilding },
  { name: "Fashion & Beauty", icon: IconHanger },
  { name: "Science", icon: IconAtom },
  { name: "Sustainability", icon: IconLeaf },
  { name: "Entertainment", icon: IconMovie },
  { name: "Pets & Animals", icon: IconPaw },
  { name: "Finance", icon: IconCoin },
  { name: "Art & Design", icon: IconPalette },
];

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
  const [isFocused, setIsFocused] = useState(false);

  const fetchKeywords = async (selectedCategory: string) => {
    if (!apiKey || !selectedCategory) return;

    setLoading(true);
    setError(null);
    try {
      const genAI = getGeminiInstance();
      const model = genAI?.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate a JSON array of 15 trending keywords for the category "${selectedCategory}" in microstock photography/illustration.
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
      if (text) {
        const parsedKeywords = JSON.parse(text);
        setKeywords(parsedKeywords);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      if (errorMessage.includes("SAFETY")) {
        setError(
          "Content was blocked due to safety filters. Please try a different category or rephrase your request."
        );
      } else if (errorMessage.includes("JSON")) {
        setError("Failed to parse AI response. Please try again.");
      } else {
        setError(`Error fetching keywords: ${errorMessage}`);
      }

      console.error("Error fetching keywords:", error);
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
      // inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };

  const handleExport = (type: "csv" | "pdf") => {
    const exportData = keywords.map((kw) => ({
      Keyword: kw.keyword,
      Relevance: kw.relevance,
      Marketplace: kw.marketplace,
    }));

    if (type === "csv") {
      exportToCSV(exportData, `keywords-${category.toLowerCase()}`);
    } else {
      exportToPDF(exportData, `keywords-${category.toLowerCase()}`);
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

const CategoryGrid = ({
  handleCategorySelect,
  category,
  customCategory,
  handleCustomCategory,
  inputRef,
  isFocused,
  handleInputChange,
}: {
  handleCategorySelect: (cat: string) => void;
  category: string;
  customCategory: string;
  handleCustomCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isFocused: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {suggestedCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`group relative flex flex-col items-center p-4 border transition-all duration-200 
                  ${
                    category === cat.name
                      ? "border-primary bg-primary/5 dark:bg-primary/10"
                      : "border-gray-200/50 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }
                `}
            >
              <Icon
                className={`w-6 h-6 mb-2 transition-colors duration-200 
                  ${
                    category === cat.name
                      ? "text-primary"
                      : "text-gray-600 dark:text-gray-400 group-hover:text-primary"
                  }
                `}
              />
              <span className="text-sm text-center font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors duration-200">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleCustomCategory} className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter custom category..."
          value={customCategory}
          onChange={handleInputChange}
          className={`flex-1 px-4 py-2.5 border transition-all duration-200
              ${
                isFocused
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-gray-200 dark:border-gray-700"
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
              placeholder-gray-500 dark:placeholder-gray-400 
              focus:outline-none`}
        />
        <button
          type="submit"
          disabled={!customCategory}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 
              disabled:opacity-50 disabled:cursor-not-allowed 
              text-white font-medium transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};
