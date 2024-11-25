'use client';

import { format } from 'date-fns';
import { IconSearch } from '@tabler/icons-react';

interface EventCardProps {
  event: {
    name: string;
    date: string;
    description: string;
    daysUntil: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(event.name)}`;
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">
            <a 
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2"
            >
              {event.name}
              <IconSearch className="w-4 h-4" />
            </a>
          </h3>
        </div>
        <div className="text-right">
          <div className="text-primary font-medium">
            {format(new Date(event.date), 'MMM d, yyyy')}
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
  );
} 