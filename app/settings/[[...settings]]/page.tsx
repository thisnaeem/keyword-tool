"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>
      <div className="bg-white dark:bg-gray-800  shadow">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "border-0 shadow-none",
            },
          }}
        />
      </div>
    </div>
  );
} 