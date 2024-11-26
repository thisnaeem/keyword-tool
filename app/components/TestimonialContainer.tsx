"use client";
import { useState, useEffect } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    message:
      "This platform has revolutionized how I plan my stock content. The keyword research is incredibly accurate!",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    name: "Marcus Rodriguez",
    role: "Stock Photographer",
    message:
      "The event planning feature helps me stay ahead of seasonal trends. My portfolio has grown significantly!",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    name: "Emily Thompson",
    role: "Digital Artist",
    message:
      "Finally found a tool that understands the microstock market. The niche analysis is spot on!",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    name: "David Kim",
    role: "Visual Content Creator",
    message:
      "The AI-powered suggestions have helped me double my portfolio acceptance rate.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    name: "Lisa Wang",
    role: "Illustrator",
    message:
      "Love how it helps me discover trending topics before they become oversaturated.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    name: "Michael Foster",
    role: "Stock Videographer",
    message:
      "The trend predictions have been incredibly accurate. It's like having a crystal ball for content creation!",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
  },
  {
    name: "Anna Martinez",
    role: "3D Artist",
    message:
      "Great for finding niche markets. My earnings have increased by 40% since using this tool.",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
  },
  {
    name: "James Wilson",
    role: "Photography Director",
    message:
      "The event calendar feature is a game-changer for planning seasonal content.",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150",
  },
  {
    name: "Sophie Chen",
    role: "Motion Designer",
    message:
      "Perfect for staying ahead of design trends. The keyword suggestions are always on point.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    name: "Alex Rivera",
    role: "Content Strategist",
    message:
      "This tool has transformed how I approach stock content creation. Absolutely worth the investment!",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150",
  },
];

export function TestimonialContainer() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start showing testimonials after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setCurrentIndex(0);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;

    // Show each testimonial for 10 seconds
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === null) return null;
        // Loop back to beginning when reaching the end
        return (prevIndex + 1) % testimonials.length;
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleClose = () => {
    setCurrentIndex(null);
  };

  return (
    <AnimatePresence>
      {isVisible && currentIndex !== null && (
        <TestimonialCard
          {...testimonials[currentIndex]}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
}
