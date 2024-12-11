import GoogleAnalytics from "@/components/GoogleAnalytics";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { TestimonialContainer } from "@/components/TestimonialContainer";
import { auth } from "@/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <>
      <GoogleAnalytics />
      <TestimonialContainer />
      <Navbar session={session} />
      {children}
      <Footer />
    </>
  );
};

export default layout;
