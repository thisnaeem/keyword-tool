'use client';

import {
    IconAtom,
    IconBarbell,
    IconBriefcase,
    IconBuilding,
    IconCalendar,
    IconCar,
    IconDevices,
    IconHeart,
    IconHeartbeat,
    IconMusic,
    IconPalette,
    IconPaw,
    IconPlane,
    IconSchool,
    IconTree
} from '@tabler/icons-react';

// Add suggestedCategories array here or pass it as a prop
const suggestedCategories = [
  { name: "Business & Work", icon: IconBriefcase },
  { name: "Nature & Landscapes", icon: IconTree },
  { name: "Technology", icon: IconDevices },
  { name: "Health & Fitness", icon: IconHeartbeat },
  { name: "Education", icon: IconSchool },
  { name: "Travel & Tourism", icon: IconPlane },
  { name: "Sports & Outdoors", icon: IconBarbell },
  { name: "Food & Drink", icon: IconHeart },
  { name: "Animals & Pets", icon: IconPaw },
  { name: "Art & Design", icon: IconPalette },
  { name: "Music & Entertainment", icon: IconMusic },
  { name: "Architecture & Interiors", icon: IconBuilding },
  { name: "Events & Activities", icon: IconCalendar },
  { name: "Vehicles & Transportation", icon: IconCar },
  { name: "Science & Nature", icon: IconAtom },


];

interface CategoryGridProps {
  handleCategorySelect: (category: string) => void;
  category: string;
  customCategory: string;
  handleCustomCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isFocused: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryGrid({
  handleCategorySelect,
  category,
  customCategory,
  handleCustomCategory,
  inputRef,
  handleInputChange
}: CategoryGridProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {suggestedCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`flex items-center gap-2 p-3  transition-colors ${
                category === cat.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-primary/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleCustomCategory} className="mt-4">
        <input
          ref={inputRef}
          type="text"
          value={customCategory}
          onChange={handleInputChange}
          placeholder="Or enter custom category..."
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-primary/50"
        />
      </form>
    </div>
  );
} 