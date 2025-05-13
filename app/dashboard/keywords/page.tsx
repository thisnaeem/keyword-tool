"use client";

import { CategoryGrid } from "@/components/CategoryGrid";
import ExportButtons from "@/components/ExportButtons";
import { PageHeader } from "@/components/PageHeader";
import { useConfig } from "@/context/ConfigContext";
import { exportToCSV, exportToPDF } from "@/lib/export";
import { getGeminiInstance } from "@/lib/gemini";
import { 
  IconPhoto, 
  IconTrendingUp, 
  IconSearch, 
  IconArrowUpRight, 
  IconChartBar,
  IconBriefcase,
  IconTree,
  IconDevices,
  IconHeartRateMonitor,
  IconSchool,
  IconPlane,
  IconBallFootball,
  IconCup,
  IconPaw,
  IconPalette,
  IconMusic,
  IconBuilding,
  IconCalendarEvent,
  IconCar,
  IconMicroscope
} from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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

// Add popular categories data
const popularCategories = [
  {
    name: "Business & Work",
    icon: IconBriefcase,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10"
  },
  {
    name: "Nature & Landscapes",
    icon: IconTree,
    color: "text-green-400",
    bgColor: "bg-green-400/10"
  },
  {
    name: "Technology",
    icon: IconDevices,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    name: "Health & Fitness",
    icon: IconHeartRateMonitor,
    color: "text-red-400",
    bgColor: "bg-red-400/10"
  },
  {
    name: "Education",
    icon: IconSchool,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10"
  },
  {
    name: "Travel & Tourism",
    icon: IconPlane,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10"
  },
  {
    name: "Sports & Outdoors",
    icon: IconBallFootball,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10"
  },
  {
    name: "Food & Drink",
    icon: IconCup,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10"
  },
  {
    name: "Animals & Pets",
    icon: IconPaw,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10"
  },
  {
    name: "Art & Design",
    icon: IconPalette,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10"
  },
  {
    name: "Music & Entertainment",
    icon: IconMusic,
    color: "text-violet-400",
    bgColor: "bg-violet-400/10"
  },
  {
    name: "Architecture & Interiors",
    icon: IconBuilding,
    color: "text-slate-400",
    bgColor: "bg-slate-400/10"
  },
  {
    name: "Events & Activities",
    icon: IconCalendarEvent,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10"
  },
  {
    name: "Vehicles & Transportation",
    icon: IconCar,
    color: "text-sky-400",
    bgColor: "bg-sky-400/10"
  },
  {
    name: "Science & Nature",
    icon: IconMicroscope,
    color: "text-teal-400",
    bgColor: "bg-teal-400/10"
  }
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
      const model = genAI?.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Keyword Research</h1>
          <p className="text-gray-400">Discover trending keywords and content opportunities</p>
        </div>

        {/* Popular Categories Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="rounded-2xl bg-gray-800/50 border border-white/5 p-6 mb-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Select Category</h2>
            <p className="text-gray-400 mt-1">Choose a category to find relevant keywords</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategorySelect(cat.name)}
                className={`p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200 ${cat.bgColor} group`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/20">
                    <cat.icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                    {cat.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Keyword Discovery Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="rounded-2xl bg-gray-800/50 border border-white/5 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Custom Search</h2>
              <p className="text-gray-400">Or enter your own category</p>
            </div>
            <div className="relative w-full md:w-96">
              <form onSubmit={handleCustomCategory} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={customCategory}
                  onChange={handleInputChange}
                  placeholder="Enter a category or topic..."
                  className="w-full px-4 py-2 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-500/50 text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
                >
                  <IconSearch className="w-5 h-5 text-emerald-400" />
                </button>
              </form>
              <SearchSuggestions
                suggestions={suggestions}
                visible={showSuggestions}
                onSelect={handleSuggestionSelect}
                searchTerm={customCategory}
              />
            </div>
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
                <IconSearch className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-lg font-medium text-gray-200">Analyzing Keywords</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center"
          >
            <IconSearch className="w-8 h-8 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-400 mb-2">Error</h3>
            <p className="text-gray-400">{error}</p>
          </motion.div>
        ) : keywords.length > 0 ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Keywords for &quot;{category}&quot;
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Found {keywords.length} relevant keywords
                </p>
              </div>
              <ExportButtons onExport={handleExport} count={keywords.length} />
            </div>

            <div className="space-y-4">
              {keywords.map((kw, index) => (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  variants={fadeInUp}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-white/5 group hover:border-emerald-500/20 p-4"
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1">
                      <h3 
                        className="text-lg text-gray-200 hover:text-emerald-400 cursor-pointer flex items-center gap-2 group"
                        onClick={() => handleKeywordClick(kw.keyword)}
                      >
                        {getHighlightedText(kw.keyword, category)}
                        <IconTrendingUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1 rounded-md text-sm font-medium ${getDifficultyLabel(kw.difficulty).color}`}>
                        {getDifficultyLabel(kw.difficulty).label}
                      </span>

                      <div className="flex gap-2">
                        {platformLinks.map((platform) => (
                          <a
                            key={platform.name}
                            href={`${platform.url}${encodeURIComponent(kw.keyword)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/platform"
                            title={platform.name}
                          >
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                              <platform.icon className="w-4 h-4 text-gray-400 group-hover/platform:text-emerald-400" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : category ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-12 text-center"
          >
            <IconSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">No Keywords Found</h3>
            <p className="text-gray-400">
              Try searching for a different category or topic
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-12 text-center"
          >
            <IconSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">Ready to Discover</h3>
            <p className="text-gray-400">
              Enter a category or topic to find relevant keywords
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
