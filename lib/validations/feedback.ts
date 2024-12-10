import * as z from "zod";

export const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "suggestion"]),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>; 