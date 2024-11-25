'use client';

import { BackgroundBoxes } from './components/BackgroundBoxes';

export default function Home() {
  return (
    <div className="relative min-h-[60vh] flex items-center">
      <BackgroundBoxes />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Microstock Content Planner
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Use the sidebar to navigate through research tools and settings.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          {['Adobe Stock', 'Shutterstock', 'Freepik', 'Vecteezy'].map((platform) => (
            <div key={platform} className="px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {platform}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
