import GoogleAnalytics from "@/components/GoogleAnalytics";
import { TestimonialContainer } from "@/components/TestimonialContainer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoogleAnalytics />
      <TestimonialContainer />
      {children}
    </>
  );
};

export default layout;
