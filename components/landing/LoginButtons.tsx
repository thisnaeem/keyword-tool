"use client";
import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { Session } from "next-auth";

const LoginButtons = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex justify-center">
      {session ? (
        <Link href="/dashboard">
          <button className="inline-flex items-center px-6 py-3 text-black bg-[#97ef39] hover:bg-[#88d633] transition-all duration-200 shadow-md hover:shadow-lg">
            Go to Dashboard
            <IconArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className="inline-flex items-center px-6 py-3 text-white bg-[#97ef39] hover:bg-[#88d633] transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
            <IconArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default LoginButtons;
