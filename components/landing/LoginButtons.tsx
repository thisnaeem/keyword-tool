"use client";
import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { Session } from "next-auth";

interface LoginButtonsProps {
  session: Session | null;
  size?: 'sm' | 'md' | 'lg';
}

const LoginButtons = ({ session, size = 'lg' }: LoginButtonsProps) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      button: "px-3 py-1.5 text-sm",
      icon: "w-4 h-4 ml-1.5"
    },
    md: {
      button: "px-4 py-2 text-base",
      icon: "w-4.5 h-4.5 ml-1.5"
    },
    lg: {
      button: "px-6 py-3 text-base",
      icon: "w-5 h-5 ml-2"
    }
  };

  const buttonClass = `inline-flex items-center text-black bg-[#97ef39] hover:bg-[#88d633] transition-all duration-200 shadow-md hover:shadow-lg ${sizeClasses[size].button}`;
  const iconClass = sizeClasses[size].icon;

  return (
    <div className="flex justify-center">
      {session ? (
        <Link href="/dashboard">
          <button className={buttonClass}>
            Go to Dashboard
            <IconArrowRight className={iconClass} />
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className={buttonClass}>
            Get Started
            <IconArrowRight className={iconClass} />
          </button>
        </Link>
      )}
    </div>
  );
};

export default LoginButtons;
