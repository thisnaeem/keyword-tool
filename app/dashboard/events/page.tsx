"use client";

import { useState, useEffect } from "react";
import { getGeminiInstance } from "@/lib/gemini";
import { EventsFilter } from "@/components/EventsFilter";
import { format, differenceInDays, isToday, isTomorrow } from "date-fns";
import { useConfig } from "@/context/ConfigContext";
import { IconCalendar, IconCalendarEvent, IconStar, IconArrowUpRight, IconUsers, IconTrendingUp, IconClock, IconChartBar, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Event {
  name: string;
  date: string;
  description: string;
  daysUntil: number;
  isPriority?: boolean;
}

type FilterPeriod = "week" | "month" | "year";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const formatEventDate = (date: string, daysUntil: number) => {
  const eventDate = new Date(date);
  
  // Format the full date
  const fullDate = format(eventDate, "MMM d, yyyy");
  
  // Get relative time
  let relativeTime = "";
  if (isToday(eventDate)) {
    relativeTime = "Today";
  } else if (isTomorrow(eventDate)) {
    relativeTime = "Tomorrow";
  } else if (daysUntil < 7) {
    relativeTime = `${daysUntil} days away`;
  } else if (daysUntil < 30) {
    relativeTime = `${Math.floor(daysUntil / 7)} weeks away`;
  } else {
    relativeTime = `${Math.floor(daysUntil / 30)} months away`;
  }

  return { fullDate, relativeTime };
};

const EventPlaceholderSVG = () => (
  <div className="w-full h-full bg-gray-800/50 flex items-center justify-center p-8">
    <svg
      className="w-full h-full text-gray-600"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 15L16 10L5 21"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const dummyImageUrl = "/placeholder-event.jpg";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>("month");
  const { apiKey } = useConfig();

  const fetchEvents = async (period: FilterPeriod) => {
    if (!apiKey) {
      toast.error("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = getGeminiInstance();
      if (!genAI) throw new Error("Gemini AI not initialized");

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Generate a JSON array of 5 upcoming events. Each object should have:
      - name (string): event name
      - date (string): future date in YYYY-MM-DD format
      - description (string): brief event description
      - daysUntil (number): days until event
      - isPriority (boolean): whether it's a priority event
      
      Focus on ${period} events.
      Return ONLY valid JSON array.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\r\n\t]/g, "")
        .trim();

      const parsedEvents = JSON.parse(cleanedText);

      if (!Array.isArray(parsedEvents)) {
        throw new Error("Invalid response format");
      }

      // Add dummy image URL to each event
      const eventsWithImages = parsedEvents.map(event => ({
        ...event,
        imageUrl: dummyImageUrl
      }));

      setEvents(eventsWithImages);
      toast.success("Successfully fetched events!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch events";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const priorityEvents = events.filter((event) => event.isPriority);
  const regularEvents = events.filter((event) => !event.isPriority);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Events Calendar</h1>
          <p className="text-gray-400">Discover upcoming events and content opportunities</p>
        </div>

        {/* Event Discovery Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="rounded-2xl bg-gray-800/50 border border-white/5 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Event Discovery</h2>
              <p className="text-gray-400">Find upcoming events for content planning</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("week")}
                className={`border border-white/5 hover:bg-white/5 ${
                  selectedPeriod === "week" ? "bg-white/10 text-white" : "text-gray-400"
                }`}
              >
                This Week
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("month")}
                className={`border border-white/5 hover:bg-white/5 ${
                  selectedPeriod === "month" ? "bg-white/10 text-white" : "text-gray-400"
                }`}
              >
                This Month
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPeriod("year")}
                className={`border border-white/5 hover:bg-white/5 ${
                  selectedPeriod === "year" ? "bg-white/10 text-white" : "text-gray-400"
                }`}
              >
                This Year
              </Button>
              <Button
                variant="default"
                onClick={() => fetchEvents(selectedPeriod)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
                isLoading={loading}
                leftIcon={<IconSearch className="w-4 h-4" />}
                glow
              >
                Find Events
              </Button>
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
                <IconCalendar className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-lg font-medium text-gray-200">Finding Events</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
              </div>
            </div>
          </motion.div>
        ) : events.length > 0 ? (
          <div className="space-y-6">
            {/* Priority Events */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="grid gap-4"
            >
              <div className="grid grid-cols-1 gap-6">
                {events
                  .filter(event => event.isPriority)
                  .map((event, index) => (
                    <motion.div
                      key={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                      variants={fadeInUp}
                      className="bg-gray-800/50 rounded-xl overflow-hidden border border-white/5 group hover:border-emerald-500/20"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48">
                          <EventPlaceholderSVG />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 mix-blend-multiply" />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-emerald-500/20">
                              <IconStar className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-emerald-400">Priority Event</span>
                          </div>
                          
                          <h3 className="text-xl font-medium text-white mb-2">{event.name}</h3>
                          <p className="text-gray-300">{event.description}</p>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                              <IconCalendarEvent className="w-5 h-5 text-emerald-400" />
                              <span className="text-emerald-300">{format(new Date(event.date), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-sm text-emerald-300">{event.daysUntil === 0 ? "Today" : 
                                event.daysUntil === 1 ? "Tomorrow" : 
                                `${event.daysUntil} days away`}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Regular Events */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="grid gap-4"
            >
              <div className="grid grid-cols-1 gap-6">
                {events
                  .filter(event => !event.isPriority)
                  .map((event, index) => (
                    <motion.div
                      key={index}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: index * 0.1 }}
                      variants={fadeInUp}
                      className="bg-gray-800/50 rounded-xl overflow-hidden border border-white/5 group hover:border-white/10"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-64 h-48">
                          <EventPlaceholderSVG />
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90 mix-blend-multiply" />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gray-700/50">
                              <IconCalendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="text-gray-300">Upcoming Event</span>
                          </div>
                          
                          <h3 className="text-xl font-medium text-white mb-2">{event.name}</h3>
                          <p className="text-gray-300">{event.description}</p>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                              <IconCalendarEvent className="w-5 h-5 text-gray-400" />
                              <span className="text-gray-200">{format(new Date(event.date), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                              <span className="text-sm text-gray-300">{event.daysUntil === 0 ? "Today" : 
                                event.daysUntil === 1 ? "Tomorrow" : 
                                `${event.daysUntil} days away`}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center"
          >
            <IconCalendar className="w-8 h-8 text-red-400 mx-auto mb-4" />
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
            <IconCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-200 mb-2">No Events Found</h3>
            <p className="text-gray-400">
              Select a time period and click Find Events to discover upcoming opportunities
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
