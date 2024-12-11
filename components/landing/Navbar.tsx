"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import LoginButtons from "./LoginButtons";
import { Session } from "next-auth";

const features = [
  {
    title: "Research Tools",
    items: [
      {
        name: "Keyword Research",
        description: "Find profitable keywords across platforms",
      },
      {
        name: "Event Planning",
        description: "Plan content around upcoming events",
      },
      {
        name: "Niche Analysis",
        description: "Discover trending market opportunities",
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        name: "Performance Tracking",
        description: "Monitor your content success",
      },
      { name: "Trend Analysis", description: "Stay ahead of market trends" },
      {
        name: "Competition Research",
        description: "Analyze competitor strategies",
      },
    ],
  },
];

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#97ef39] to-[#7bc62d]">
              Earnlyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowFeatures(true)}
              onMouseLeave={() => setShowFeatures(false)}
            >
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-[#97ef39] dark:hover:text-[#97ef39] transition-colors">
                <span>Features</span>
                <IconChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {showFeatures && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 w-[500px] mt-2 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      {features.map((section) => (
                        <div key={section.title}>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {section.title}
                          </h3>
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item.name}>
                                <a
                                  href="#"
                                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                                >
                                  <div className="font-medium text-gray-700 dark:text-gray-300">
                                    {item.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {item.description}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#faq"
              className="text-gray-600 dark:text-gray-300 hover:text-[#97ef39] dark:hover:text-[#97ef39] transition-colors"
            >
              FAQ
            </a>

            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-300 hover:text-[#97ef39] dark:hover:text-[#97ef39] transition-colors"
            >
              Contact Us
            </Link>

            <LoginButtons session={session} size="sm" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#97ef39] transition-colors"
            >
              {isMobileMenuOpen ? (
                <IconX className="w-6 h-6" />
              ) : (
                <IconMenu2 className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-600 dark:text-gray-300 hover:text-[#97ef39] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("faq")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block text-gray-600 dark:text-gray-300 hover:text-[#97ef39] transition-colors"
              >
                FAQ
              </a>
              <Link
                href="/contact"
                className="block text-gray-600 dark:text-gray-300 hover:text-[#97ef39] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <LoginButtons session={session} size="md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
