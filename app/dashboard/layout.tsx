import { ConfigProvider } from "@/context/ConfigContext";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </ConfigProvider>
  );
}
