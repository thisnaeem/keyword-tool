import type { Metadata } from "next";
import { ConfigProvider } from './context/ConfigContext';
import Layout from './components/Layout';
import { Manrope } from 'next/font/google';
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Microstock Content Planner",
  description: "Research tool for microstock content creators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className} suppressHydrationWarning>
      <body className="dark">
        <ClerkProvider>
          <ConfigProvider>
            <Layout>{children}</Layout>
          </ConfigProvider>
          <GoogleAnalytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
