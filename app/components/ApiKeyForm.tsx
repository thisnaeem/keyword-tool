'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConfig } from '../context/ConfigContext';
import { initializeGemini } from '../lib/gemini';

const schema = z.object({
  apiKey: z.string().min(1, 'API Key is required'),
});

export default function ApiKeyForm() {
  const { apiKey, setApiKey } = useConfig();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      apiKey: apiKey || ''
    }
  });

  const onSubmit = (data: { apiKey: string }) => {
    setApiKey(data.apiKey);
    initializeGemini(data.apiKey);
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 p-4 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          To use this application, you need a Google Gemini API key. 
          Get your API key from the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Google Gemini API Key
          </label>
          <input
            type="password"
            {...register('apiKey')}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="Enter your API key"
          />
          {errors.apiKey && (
            <p className="text-red-500 text-sm mt-1">
              {errors.apiKey.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save API Key
          </button>
        </div>
      </form>

      {apiKey && (
        <div className="bg-primary/10 p-4 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            ✓ API Key is configured and saved
          </p>
        </div>
      )}
    </div>
  );
} 