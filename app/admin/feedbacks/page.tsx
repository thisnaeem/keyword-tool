"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { PageHeader } from "@/components/PageHeader";

interface FeedbackItem {
  id: string;
  type: 'bug' | 'feature' | 'suggestion';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`/api/admin/feedback?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedback(data.feedback);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      toast.error('Failed to load feedback');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [currentPage]);

  const handleStatusChange = async (feedbackId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      toast.success('Status updated successfully');
      fetchFeedback();
    } catch (error) {
      toast.error('Failed to update status');
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

  return (
    <div className="space-y-6">
      <div className="p-4  border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Feedbacks
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="text-left p-4">User</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{item.user.name}</div>
                          <div className="text-sm text-gray-500">
                            {item.user.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize">{item.type}</span>
                      </td>
                      <td className="p-4">
                        <div className="max-w-md">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500 truncate">
                            {item.description}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item.id, e.target.value)
                          }
                          className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                            item.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-4">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            /* Add view details handler */
                          }}
                          className="text-primary hover:text-primary/80"
                        >
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 p-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 