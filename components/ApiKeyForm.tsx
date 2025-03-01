"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useConfig } from "../context/ConfigContext";
import { initializeGemini } from "../lib/gemini";
import { IconKey, IconExternalLink } from "@tabler/icons-react";
import { toast } from "react-hot-toast";

const schema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
});

export default function ApiKeyForm() {
  const { apiKey, setApiKey } = useConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      apiKey: apiKey || "",
    },
  });

  const onSubmit = (data: { apiKey: string }) => {
    setApiKey(data.apiKey);
    initializeGemini(data.apiKey);
    toast.success("API key saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Google Gemini API Key</h2>
          <p className="text-gray-400">Configure your API key to access AI-powered features</p>
        </div>

        <div className="p-4 rounded-xl bg-gray-900/50 border border-white/5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <IconKey className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-200">Get Your API Key</h3>
              <p className="mt-1 text-sm text-gray-400">
                Visit the Google AI Studio to get your API key. It&apos;s free to start!
              </p>
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Get API Key
                <IconExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="password"
              {...register("apiKey")}
              className="w-full px-4 py-2 bg-gray-900 border border-white/10 rounded-lg focus:outline-none focus:border-emerald-500/50 text-white placeholder-gray-500"
              placeholder="Enter your API key"
            />
            {apiKey && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400">Active</span>
                </div>
              </div>
            )}
          </div>
          {errors.apiKey && (
            <p className="mt-1.5 text-sm text-red-400">{errors.apiKey.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            Save API Key
          </button>
          {apiKey && (
            <p className="text-sm text-gray-400">
              Your API key is securely saved in your browser
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
