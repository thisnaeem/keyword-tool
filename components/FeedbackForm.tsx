import { useState } from "react";
import { IconBug, IconBulb, IconMessage2, IconSend } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackInput, feedbackSchema } from "@/lib/validations/feedback";
import { toast } from "react-hot-toast";

type FeedbackType = "bug" | "feature" | "suggestion";

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FeedbackInput>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      type: "feature",
    },
  });

  const type = watch("type");

  const onSubmit = async (data: FeedbackInput) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypes = [
    { value: "bug" as const, label: "Bug Report", icon: IconBug },
    { value: "feature" as const, label: "Feature Request", icon: IconMessage2 },
    { value: "suggestion" as const, label: "Suggestion", icon: IconBulb },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Submit Feedback
      </h3>

      <div className="flex gap-2">
        {feedbackTypes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setValue("type", value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              type === value
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <textarea
          {...register("description")}
          placeholder="Describe your feedback..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin" />
        ) : (
          <IconSend size={16} />
        )}
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
