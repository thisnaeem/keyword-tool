'use client';

import { format } from 'date-fns';
import { IconCalendarEvent, IconSearch } from '@tabler/icons-react';

interface EventCardProps {
  event: {
    name: string;
    date: string;
    description: string;
    daysUntil: number;
    isPriority?: boolean;
  };
}

export function EventCard({ event }: EventCardProps) {
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(event.name)}`;
  
  return (
    <div className={`
      bg-white dark:bg-gray-800 p-6 
      shadow-sm hover:shadow-md transition-all duration-300
      border border-gray-100 dark:border-gray-700
      ${event.isPriority ? 'ring-2 ring-primary/20' : ''}
    `}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
            <a 
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
            >
              <span className="truncate">{event.name}</span>
              <IconSearch className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
            {event.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2 text-primary font-medium">
            <IconCalendarEvent className="w-4 h-4" />
            {format(new Date(event.date), 'MMM d, yyyy')}
          </div>
          <div className={`
            text-sm px-2 py-0.5 
            ${event.daysUntil === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
              event.daysUntil === 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}
          `}>
            {event.daysUntil === 0 ? 'Today' : 
             event.daysUntil === 1 ? 'Tomorrow' : 
             `In ${event.daysUntil} days`}
          </div>
        </div>
      </div>
    </div>
  );
} 