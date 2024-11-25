import { IconCalendar } from '@tabler/icons-react';

type FilterPeriod = 'week' | 'month' | 'year';

interface EventsFilterProps {
  activePeriod: FilterPeriod;
  onPeriodChange: (period: FilterPeriod) => void;
}

export function EventsFilter({ activePeriod, onPeriodChange }: EventsFilterProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onPeriodChange('week')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          activePeriod === 'week'
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary/10'
        }`}
      >
        <IconCalendar className="w-4 h-4 mr-2" />
        This Week
      </button>
      <button
        onClick={() => onPeriodChange('month')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          activePeriod === 'month'
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary/10'
        }`}
      >
        <IconCalendar className="w-4 h-4 mr-2" />
        This Month
      </button>
      <button
        onClick={() => onPeriodChange('year')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          activePeriod === 'year'
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary/10'
        }`}
      >
        <IconCalendar className="w-4 h-4 mr-2" />
        This Year
      </button>
    </div>
  );
} 