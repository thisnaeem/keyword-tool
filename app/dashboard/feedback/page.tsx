"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IconMessage, IconStar, IconMoodSmile, IconBulb, IconSend } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const feedbackCategories = [
  {
    icon: IconStar,
    title: "General Feedback",
    description: "Share your overall experience with Earnlyzer"
  },
  {
    icon: IconBulb,
    title: "Feature Request",
    description: "Suggest new features or improvements"
  },
  {
    icon: IconMoodSmile,
    title: "User Experience",
    description: "Tell us about the interface and usability"
  }
];

export default function FeedbackPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("General Feedback");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to submit feedback
      // await submitFeedback({ category: selectedCategory, feedback, rating });
      
      toast.success("Thank you for your feedback!");
      setFeedback("");
      setRating(0);
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-bold">Feedback</h1>
          <p className="text-gray-400">Help us improve Earnlyzer with your feedback</p>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {feedbackCategories.map((category) => (
              <Button
                key={category.title}
                onClick={() => setSelectedCategory(category.title)}
                variant={selectedCategory === category.title ? "secondary" : "outline"}
                className="flex-col h-auto p-6"
                leftIcon={
                  <category.icon className={`w-8 h-8 mb-4 ${
                    selectedCategory === category.title ? "text-purple-400" : "text-gray-400"
                  }`} />
                }
              >
                <h3 className="text-lg font-medium text-white mb-2">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </Button>
            ))}
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-gray-800/50 border border-white/5 p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      variant={star <= rating ? "default" : "outline"}
                      size="icon"
                      leftIcon={<IconStar className="w-6 h-6" />}
                      className={star <= rating ? "text-yellow-400 bg-yellow-400/10" : ""}
                    />
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400/50"
                  placeholder="Tell us what you think..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={isSubmitting || !feedback.trim()}
                  isLoading={isSubmitting}
                  leftIcon={isSubmitting ? undefined : <IconSend className="w-4 h-4" />}
                  glow
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-gradient-to-b from-emerald-400/10 to-emerald-400/5 p-6 border border-white/5 text-center"
          >
            <IconMessage className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Direct Contact</h2>
            <p className="text-gray-400 mb-4">
              Have a specific issue or question? Reach out to us directly.
            </p>
            <Button
              variant="default"
              leftIcon={<IconMessage className="w-4 h-4" />}
              glow
              onClick={() => window.location.href = "mailto:support@earnlyzer.com"}
            >
              Contact Support
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
