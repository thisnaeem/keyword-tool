"use client";
import { useState } from "react";
import FaqItem from "./FaqItem";

const faqItems = [
  {
    question: "What is Microstock Content Planner?",
    answer: "Microstock Content Planner is an AI-powered platform designed to help content creators optimize their microstock portfolio across multiple platforms through keyword research, trend analysis, and event planning."
  },
  {
    question: "How does the keyword research tool work?",
    answer: "Our keyword research tool analyzes search trends across major stock platforms like Adobe Stock, Shutterstock, and Freepik to help you find profitable keywords and optimize your content's visibility."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can sign up and explore our basic features to see how the platform can benefit your content strategy. Premium features are available with a subscription."
  },
  {
    question: "Which stock platforms are supported?",
    answer: "We currently support major platforms including Adobe Stock, Shutterstock, and Freepik, with plans to add more platforms in the future."
  },
  {
    question: "How often is the trend data updated?",
    answer: "Our trend data is updated daily to ensure you have access to the most current market insights and opportunities."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqItems.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
} 