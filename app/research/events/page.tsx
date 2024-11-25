'use client';

import { useState, useEffect } from 'react';
import { getGeminiInstance } from '@/app/lib/gemini';
import { useConfig } from '@/app/context/ConfigContext';

interface Event {
  name: string;
  date: string;
  description: string;
  daysUntil: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useConfig();

  const fetchEvents = async () => {
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
      
      const prompt = `Generate a JSON array of 5 upcoming world events, celebrations, or observances happening in the next 90 days from ${today.toISOString().split('T')[0]}. 
      Include major holidays, cultural events, and industry events that microstock contributors should prepare content for.
      Each object must have exactly these fields:
      - name (string): event name
      - date (string): event date in YYYY-MM-DD format
      - description (string): brief description
      
      Sort by date ascending. Respond ONLY with the JSON array, no other text.
      Example: [{"name": "Earth Day", "date": "2024-04-22", "description": "Annual environmental awareness day"}]`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) throw new Error('No response from AI');

      const cleanedText = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .replace(/[\r\n\t]/g, '')
        .trim();

      const parsedEvents = JSON.parse(cleanedText);
      if (!Array.isArray(parsedEvents)) throw new Error('Response is not an array');

      const validatedEvents = parsedEvents.map(event => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate.getTime() - today.getTime();
        const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return {
          name: String(event.name),
          date: event.date,
          description: String(event.description),
          daysUntil
        };
      }).sort((a, b) => a.daysUntil - b.daysUntil);
      
      setEvents(validatedEvents);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) {
      fetchEvents();
    }
  }, [apiKey]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {error ? (
          <div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/30">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <div className="text-right">
                    <div className="text-blue-500 font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.daysUntil === 0 ? 'Today' : 
                       event.daysUntil === 1 ? 'Tomorrow' : 
                       `In ${event.daysUntil} days`}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={fetchEvents}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh Events'}
        </button>
      </div>
    </div>
  );
} 