"use client";

import { HeroGeometric } from "./shape-landing-hero";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function HeroWrapper() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <HeroGeometric 
      badge="AI-Powered Research"
      title1="Create profitable microstock"
      title2="content in minutes"
      button={
        isAuthenticated ? (
          <Link 
            href="/dashboard" 
            className="inline-flex items-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link 
            href="/login" 
            className="inline-flex items-center px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-colors"
          >
            Get Started
          </Link>
        )
      }
    />
  );
} 