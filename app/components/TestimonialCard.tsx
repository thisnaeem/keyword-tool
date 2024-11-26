import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

interface TestimonialProps {
  name: string;
  role: string;
  message: string;
  imageUrl: string;
  onClose: () => void;
}

export function TestimonialCard({ name, role, message, imageUrl, onClose }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
      >
        <IconX className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{message}</p>
          <div>
            <h4 className="font-medium text-primary">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 