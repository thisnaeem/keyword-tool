import Layout from "@/components/Layout";
import { ConfigProvider } from "@/context/ConfigContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider>
      <Layout>
        <div className="flex flex-col h-screen">
          <DashboardHeader />
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
};

export default layout;
