"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { FeedbackForm } from "../components/FeedbackForm";

export default function FeedbackPage() {
  const supabase = createClientComponentClient();

  const handleFeedbackSubmit = async (data: {
    type: 'bug' | 'feature' | 'suggestion';
    title: string;
    description: string;
  }) => {
    try {
      // Debug: Log the Supabase URL and connection
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      // Debug: Log the data being submitted
      console.log('Submitting feedback:', data);

      const { error, data: insertedData } = await supabase
        .from('feedback')
        .insert([{ 
          type: data.type,
          title: data.title,
          description: data.description,
          created_at: new Date().toISOString(),
        }])
        .select('*');  // Add explicit select

      if (error) {
        console.error('Supabase error details:', error);
        throw new Error(error.message);
      }

      console.log('Inserted data:', insertedData);  // Debug: Log the response
      toast.success('Feedback submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Feedback & Suggestions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We&apos;d love to hear your feedback! Please share any bugs you&apos;ve found, features you&apos;d like to see, or general suggestions for improvement.
          </p>
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </div>
      </div>
    </div>
  );
} 