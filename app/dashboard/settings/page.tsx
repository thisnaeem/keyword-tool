"use client";
import ApiKeyForm from "@/components/ApiKeyForm";
import { PageHeader } from "@/components/PageHeader";

export default function ApiSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader title="API Configuration" />
      <div className="bg-white dark:bg-gray-800 shadow-lg p-6">
        <ApiKeyForm />
      </div>
    </div>
  );
}
