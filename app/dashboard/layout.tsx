import Layout from "@/components/Layout";
import { ConfigProvider } from "@/context/ConfigContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ConfigProvider>
        <Layout>{children}</Layout>
      </ConfigProvider>
    </>
  );
};

export default layout;
