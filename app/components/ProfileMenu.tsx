"use client";

import { useState } from "react";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronDown,
} from "@tabler/icons-react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700  transition-colors"
      >
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm font-medium">{user.fullName}</span>
        <IconChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-gray-800  shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700  transition-colors"
            >
              <IconUser className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="flex items-center gap-2 w-full p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700  transition-colors"
            >
              <IconSettings className="w-4 h-4" />
              Settings
            </button>
            <hr className="my-2 border-gray-200 dark:border-gray-700" />
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <IconLogout className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
