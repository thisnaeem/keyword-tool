"use client";

import { CategoryGrid } from "@/components/CategoryGrid";
import ExportButtons from "@/components/ExportButtons";
import { PageHeader } from "@/components/PageHeader";
import { useConfig } from "@/context/ConfigContext";
import { exportToCSV, exportToPDF } from "@/lib/export";
import { getGeminiInstance } from "@/lib/gemini";
import { IconPhoto, IconTrendingUp } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";

interface KeywordSuggestion {
  keyword: string;
  relevance: number;
  difficulty: number;
  competition: number;
  marketplace: "Adobe Stock" | "Shutterstock" | "Freepik" | "Vecteezy";
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
  {
    name: "Vecteezy",
    url: "https://www.vecteezy.com/free-vector/",
    icon: IconPhoto,
  },
];

// Function to get search volume ranges
const getSearchVolume = async (keyword: string, platform: string): Promise<number> => {
  try {
    // Using a proxy service or platform APIs to get actual search volumes
    // This is a placeholder - you'll need to implement actual API calls
    const response = await fetch(`/api/search-volume?keyword=${encodeURIComponent(keyword)}&platform=${platform}`);
    const data = await response.json();
    return data.volume;
  } catch (error) {
    console.error(`Error fetching search volume for ${platform}:`, error);
    return 0;
  }
};

// Calculate KD based on actual search volumes and competition
const calculateKeywordDifficulty = (searchVolumes: number[]): number => {
  const totalVolume = searchVolumes.reduce((sum, volume) => sum + volume, 0);
  
  // KD calculation based on total volume across platforms
  if (totalVolume > 1000000) return 9; // Very high competition
  if (totalVolume > 500000) return 7;  // High competition
  if (totalVolume > 100000) return 5;  // Medium competition
  if (totalVolume > 10000) return 3;   // Low competition
  return 1; // Very low competition
};

// Calculate competition level based on platform presence and volumes
const calculateCompetitionLevel = (searchVolumes: number[]): number => {
  const activeMarkets = searchVolumes.filter(volume => volume > 1000).length;
  const avgVolume = searchVolumes.reduce((sum, volume) => sum + volume, 0) / searchVolumes.length;
  
  // Competition calculation based on market presence and average volume
  if (activeMarkets >= 3 && avgVolume > 500000) return 9; // High competition
  if (activeMarkets >= 2 && avgVolume > 100000) return 7; // Medium competition
  if (activeMarkets >= 1 && avgVolume > 10000) return 5;  // Low-Medium competition
  return 3; // Low competition
};

// Update the getDifficultyLabel thresholds for more accurate representation
const getDifficultyLabel = (difficulty: number) => {
  if (difficulty <= 3) return { label: 'Easy', color: 'bg-emerald-500 text-white' };
  if (difficulty <= 6) return { label: 'Medium', color: 'bg-yellow-400 text-black' };
  return { label: 'Hard', color: 'bg-red-500 text-white' };
};

// Update the getCompetitionLabel thresholds for more accurate representation
const getCompetitionLabel = (competition: number) => {
  if (competition <= 3) return { 
    label: 'Low', 
    color: 'bg-blue-100 text-blue-700 border border-blue-200' 
  };
  if (competition <= 6) return { 
    label: 'Medium', 
    color: 'bg-purple-100 text-purple-700 border border-purple-200' 
  };
  return { 
    label: 'High', 
    color: 'bg-orange-100 text-orange-700 border border-orange-200' 
  };
};

const getHighlightedText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.split(regex).map((part, i) => 
    regex.test(part) ? <span key={i} className="bg-primary/30 text-white">{part}</span> : part
  );
};

// Add new component for search suggestions
const SearchSuggestions = ({ 
  suggestions, 
  visible, 
  onSelect,
  searchTerm 
}: { 
  suggestions: string[], 
  visible: boolean,
  onSelect: (keyword: string) => void,
  searchTerm: string
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full px-4 py-2 text-left hover:bg-gray-700 text-gray-200 flex items-center gap-2"
          onClick={() => onSelect(suggestion)}
        >
          <IconTrendingUp className="w-4 h-4 text-gray-400" />
          {getHighlightedText(suggestion, searchTerm)}
        </button>
      ))}
    </div>
  );
};

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { apiKey } = useConfig();
  const [error, setError] = useState<string | null>(null);
  const [isFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchKeywords = async (selectedCategory: string) => {
    if (!apiKey || !selectedCategory) return;

    setLoading(true);
    setError(null);
    try {
      const genAI = getGeminiInstance();
      const model = genAI?.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Generate 50 concise, high-value keywords for "${selectedCategory}" in stock photography/illustration. 

Focus on:
1. Short, specific terms (2-3 words max)
2. Commercial intent keywords
3. Trending search terms
4. Niche market segments
5. Popular visual styles

AVOID:
- Generic single words
- Long descriptive phrases
- Obvious category names
- Common modifiers

Examples of good keywords:
- vintage bread
- sourdough starter
- rustic bakery
- bread scoring
- dough texture
- bakery setup

For each keyword:
1. Analyze search volume across stock platforms
2. Evaluate keyword difficulty (KD) based on:
   - Search volume
   - Competition level
   - Market demand
   - Content saturation

Return JSON array:
[{
  "keyword": string,
  "difficulty": number (1-10)
}]

KD scoring:
10: Ultra competitive (1M+ results)
7-9: High competition (500K-1M)
4-6: Moderate (100K-500K)
1-3: Low competition (<100K)

Return ONLY the JSON array.`;

      const result = await model?.generateContent(prompt);
      const text = result?.response?.text();

      if (!text) {
        throw new Error("No response from AI");
      }

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\r\n\t]/g, "")
        .trim();

      try {
        const parsedKeywords = JSON.parse(cleanedText);

        if (!Array.isArray(parsedKeywords)) {
          throw new Error("Response is not an array");
        }

        setKeywords(parsedKeywords);
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
    const value = e.target.value;
    setCustomCategory(value);
    filterSuggestions(value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = async (suggestion: string) => {
    setCustomCategory(suggestion);
    setShowSuggestions(false);
    setCategory(suggestion);
    // Immediately trigger a new search with the selected suggestion
    await fetchKeywords(suggestion);
  };

  // Update the click handler for keywords in the results
  const handleKeywordClick = async (keyword: string) => {
    setCustomCategory(keyword);
    setCategory(keyword);
    await fetchKeywords(keyword);
  };

  // Add click outside handler to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (type: "csv" | "pdf") => {
    const filename = `keywords-${new Date().toISOString().split("T")[0]}`;
    if (type === "csv") {
      exportToCSV(keywords, filename);
    } else {
      exportToPDF(keywords, filename);
    }
  };

  // Add function to filter suggestions
  const filterSuggestions = (searchTerm: string) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    
    // Filter existing keywords that match the search term
    const matches = keywords
      .map(k => k.keyword)
      .filter(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase()) &&
        keyword !== searchTerm
      )
      .slice(0, 8); // Limit to 8 suggestions
    
    setSuggestions(matches);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 ">
          {error}
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
        <div className="relative">
          <CategoryGrid
            handleCategorySelect={handleCategorySelect}
            category={category}
            customCategory={customCategory}
            handleCustomCategory={handleCustomCategory}
            inputRef={inputRef}
            isFocused={isFocused}
            handleInputChange={handleInputChange}
          />
          <SearchSuggestions
            suggestions={suggestions}
            visible={showSuggestions}
            onSelect={handleSuggestionSelect}
            searchTerm={customCategory}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800 shadow-lg space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-700 border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <IconTrendingUp className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-lg font-medium text-gray-200">Researching Keywords</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
              <p className="text-sm text-gray-400 text-center max-w-sm">
                Analyzing search volumes and competition across platforms
              </p>
            </div>
          </div>
        ) : (
          keywords.length > 0 && (
            <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Trending Keywords for {category}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Found {keywords.length} keywords
                  </p>
                </div>
                <ExportButtons onExport={handleExport} count={keywords.length} />
              </div>
              <div className="mt-8">
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-[2fr,200px,280px] p-4 bg-gray-900 border-b border-gray-700">
                    <div className="text-base text-gray-400">Keyword</div>
                    <div className="text-base text-gray-400 text-center">KD (Keyword Difficulty)</div>
                    <div className="text-base text-gray-400 text-center">Search On</div>
                  </div>

                  {/* Table Body */}
                  {keywords.map((kw, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[2fr,200px,280px] p-4 border-b border-gray-700 items-center hover:bg-gray-800/50"
                    >
                      <div>
                        <h3 
                          className="text-lg text-gray-200 hover:text-primary cursor-pointer flex items-center gap-2 group"
                          onClick={() => handleKeywordClick(kw.keyword)}
                        >
                          {getHighlightedText(kw.keyword, category)}
                          <IconTrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </h3>
                      </div>

                      <div className="flex justify-center">
                        <span className={`px-4 py-1 min-w-[100px] text-center rounded-md text-sm font-medium ${getDifficultyLabel(kw.difficulty).color}`}>
                          {getDifficultyLabel(kw.difficulty).label}
                        </span>
                      </div>

                      <div className="flex justify-between w-full max-w-[280px] mx-auto">
                        {platformLinks.map((platform) => (
                          <a
                            key={platform.name}
                            href={`${platform.url}${encodeURIComponent(kw.keyword)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center"
                          >
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                              <platform.icon className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-400 mt-1">{platform.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
