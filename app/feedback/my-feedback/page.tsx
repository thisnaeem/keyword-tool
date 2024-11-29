"use client";

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface FeedbackItem {
  _id: string;
  type: 'bug' | 'feature' | 'suggestion';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
}

export default function MyFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback');
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Feedback</h1>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{feedback.title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  feedback.status
                )}`}
              >
                {feedback.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {feedback.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{feedback.type}</span>
              <span>
                {new Date(feedback.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {feedbacks.length === 0 && (
          <p className="text-center text-gray-500">
            You haven&apos;t submitted any feedback yet.
          </p>
        )}
      </div>
    </div>
  );
} 