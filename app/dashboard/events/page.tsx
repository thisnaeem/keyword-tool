"use client";

import { useState } from "react";
import { getGeminiInstance } from "@/lib/gemini";
import { EventsFilter } from "@/components/EventsFilter";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { format } from "date-fns";
import { useConfig } from "@/context/ConfigContext";
import { IconSearch, IconCalendar, IconCalendarEvent } from "@tabler/icons-react";

interface Event {
  name: string;
  date: string;
  description: string;
  daysUntil: number;
  isPriority?: boolean;
}

type FilterPeriod = "week" | "month" | "year";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("month");
  const { apiKey } = useConfig();

  const fetchEvents = async (period: FilterPeriod) => {
    if (!apiKey) {
      setError("API key is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = getGeminiInstance();
      if (!genAI) throw new Error("Gemini AI not initialized");

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const today = new Date();
      const formattedDate = format(today, "yyyy-MM-dd");

      const periodDays = {
        week: 7,
        month: 30,
        year: 365,
      };

      const prompt = `Generate a JSON array of upcoming world events, celebrations, or observances happening in the next ${periodDays[period]} days from ${formattedDate}.

Return ONLY a JSON array with this exact format:
[{
  "name": "Event Name",
  "date": "YYYY-MM-DD",
  "description": "Brief description of the event",
  "isPriority": boolean
}]

Consider:
- Major holidays
- Cultural celebrations
- International observances
- Notable events
- Industry conferences

Return ONLY the JSON array, no additional text or formatting.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) throw new Error("No response from AI");

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\r\n\t]/g, "")
        .replace(/^JSON/, "")
        .trim();

      let parsedEvents;
      try {
        parsedEvents = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("Raw response:", cleanedText, parseError);
        throw new Error("Failed to parse AI response - invalid JSON format");
      }

      if (!Array.isArray(parsedEvents)) {
        throw new Error("Response is not an array");
      }

      const validatedEvents = parsedEvents
        .map((event) => {
          const eventDate = new Date(event.date);
          const timeDiff = eventDate.getTime() - today.getTime();
          const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

          return {
            name: String(event.name),
            date: event.date,
            description: String(event.description),
            daysUntil,
            isPriority: Boolean(event.isPriority),
          };
        })
        .filter((event) => {
          return event.daysUntil >= 0 && event.daysUntil <= periodDays[period];
        })
        .sort((a, b) => a.daysUntil - b.daysUntil);

      setEvents(validatedEvents);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const priorityEvents = events.filter((event) => event.isPriority);
  const regularEvents = events.filter((event) => !event.isPriority);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Events Calendar</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Discover upcoming events, celebrations, and important dates
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <EventsFilter
              activePeriod={filterPeriod}
              onPeriodChange={(period) => {
                setFilterPeriod(period);
              }}
            />
            <button
              onClick={() => fetchEvents(filterPeriod)}
              disabled={loading}
              className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 
              transition-colors duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <IconSearch className="w-5 h-5 text-white relative z-10" />
              <span className="text-white font-medium relative z-10">
                {loading ? "Searching..." : "Search Events"}
              </span>
              <div className="absolute inset-0 bg-black/20 translate-y-[102%] group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2">
                <IconCalendarEvent className="w-5 h-5" />
                <span className="font-medium">Error</span>
              </div>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-[#97ef39]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconCalendar className="w-6 h-6 text-[#97ef39] animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-lg font-medium text-gray-200">Finding Events</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#97ef39] animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-[#97ef39] animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-[#97ef39] animate-bounce" />
                </div>
                <p className="text-sm text-gray-400 text-center max-w-sm">
                  Analyzing upcoming events and celebrations
                </p>
              </div>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-8">
              {priorityEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-1 bg-[#97ef39]" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Priority Events
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {priorityEvents.map((event, index) => (
                      <EventCard key={index} event={event} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-1 bg-gray-300 dark:bg-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Upcoming Events
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {regularEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <IconCalendarEvent className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                No Events Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Click the Search button to discover upcoming events and celebrations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
