'use client';

import ApiKeyForm from '../../components/ApiKeyForm';

export default function ApiSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Configuration</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <ApiKeyForm />
      </div>
    </div>
  );
} 