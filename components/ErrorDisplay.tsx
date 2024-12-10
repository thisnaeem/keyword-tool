export default function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 ">
      <p className="text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
} 