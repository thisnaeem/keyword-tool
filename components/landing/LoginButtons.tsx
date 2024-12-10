"use client";
import React from "react";
import { IconArrowRight, IconBrandGoogle } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";

const LoginButtons = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {session ? (
        <Link href="/dashboard">
          <button className="inline-flex items-center px-6 py-3 text-white bg-[#97ef39] hover:bg-[#88d633]  transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
            <IconArrowRight className="ml-2 w-5 h-5" />
          </button>
        </Link>
      ) : (
        <>
          <button className="inline-flex items-center px-6 py-3 text-white bg-[#97ef39] hover:bg-[#88d633]  transition-all duration-200 shadow-md hover:shadow-lg">
            Get Started
            <IconArrowRight className="ml-2 w-5 h-5" />
          </button>

          <button
            onClick={() => {
              signIn("google");
            }}
            className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-all duration-200"
          >
            <IconBrandGoogle className="mr-2 w-5 h-5 text-red-500" />
            Continue with Google
          </button>
        </>
      )}
    </div>
  );
};

export default LoginButtons;
