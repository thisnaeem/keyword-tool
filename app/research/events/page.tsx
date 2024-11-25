'use client';

import { useState, useEffect } from 'react';
import { getGeminiInstance } from '@/app/lib/gemini';
import { useConfig } from '@/app/context/ConfigContext';
import { EventsFilter } from '@/app/components/EventsFilter';
import { PageHeader } from '@/app/components/PageHeader';
import { EventCard } from '@/app/components/EventCard';
import { format } from 'date-fns';

interface Event {
  name: string;
  date: string;
  description: string;
  daysUntil: number;
  isPriority?: boolean;
}

type FilterPeriod = 'week' | 'month' | 'year';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('month');
  const { apiKey } = useConfig();

  const fetchEvents = async (period: FilterPeriod) => {
    if (!apiKey) {
      setError('API key is required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const genAI = getGeminiInstance();
      if (!genAI) throw new Error('Gemini AI not initialized');

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const today = new Date();
      const formattedDate = format(today, 'yyyy-MM-dd');
      
      const periodDays = {
        week: 7,
        month: 30,
        year: 365
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
      
      if (!text) throw new Error('No response from AI');

      const cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/[\r\n\t]/g, '')
        .replace(/^JSON/, '')
        .trim();

      let parsedEvents;
      try {
        parsedEvents = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Raw response:', cleanedText, parseError);
        throw new Error('Failed to parse AI response - invalid JSON format');
      }

      if (!Array.isArray(parsedEvents)) {
        throw new Error('Response is not an array');
      }

      const validatedEvents = parsedEvents
        .map(event => {
          const eventDate = new Date(event.date);
          const timeDiff = eventDate.getTime() - today.getTime();
          const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

          return {
            name: String(event.name),
            date: event.date,
            description: String(event.description),
            daysUntil,
            isPriority: Boolean(event.isPriority)
          };
        })
        .filter(event => {
          return event.daysUntil >= 0 && event.daysUntil <= periodDays[period];
        })
        .sort((a, b) => a.daysUntil - b.daysUntil);
      
      setEvents(validatedEvents);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) {
      fetchEvents(filterPeriod);
    }
  }, [apiKey, filterPeriod]);

  const priorityEvents = events.filter(event => event.isPriority);
  const regularEvents = events.filter(event => !event.isPriority);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="Upcoming Events" />
      
      <EventsFilter 
        activePeriod={filterPeriod} 
        onPeriodChange={(period) => {
          setFilterPeriod(period);
          fetchEvents(period);
        }} 
      />

      <div className="space-y-8">
        {priorityEvents.length > 0 && (
          <div className="bg-primary/5 dark:bg-primary/10  p-6 border border-primary/20">
            <h2 className="text-xl font-semibold mb-4 text-primary">Priority Events</h2>
            <div className="grid gap-4">
              {priorityEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800  shadow-lg p-6">
          {error ? (
            <div className="text-red-500 p-4  bg-red-50 dark:bg-red-900/30">
              {error}
            </div>
          ) : loading ? (
            <div className="flex justify-center">
              <div className="animate-spin  h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid gap-4">
              {regularEvents.map((event, index) => (
                <EventCard key={index} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => fetchEvents(filterPeriod)}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Loading...' : 'Refresh Events'}
      </button>
    </div>
  );
} 