"use client";

import { FeedbackForm } from "@/components/FeedbackForm";

export default function FeedbackPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Feedback & Suggestions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We&apos;d love to hear your feedback! Please share any bugs
            you&apos;ve found, features you&apos;d like to see, or general
            suggestions for improvement.
          </p>
          <FeedbackForm  />
        </div>
      </div>
    </div>
  );
}
