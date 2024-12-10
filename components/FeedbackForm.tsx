import { useState } from 'react';
import { 
  IconBug, 
  IconBulb, 
  IconMessage2, 
  IconSend 
} from '@tabler/icons-react';

type FeedbackType = 'bug' | 'feature' | 'suggestion';

interface FeedbackFormProps {
  onSubmit: (data: {
    type: FeedbackType;
    title: string;
    description: string;
  }) => void;
}

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [type, setType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, title, description });
    setTitle('');
    setDescription('');
  };

  const feedbackTypes = [
    { value: 'bug' as const, label: 'Bug Report', icon: IconBug },
    { value: 'feature' as const, label: 'Feature Request', icon: IconMessage2 },
    { value: 'suggestion' as const, label: 'Suggestion', icon: IconBulb },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Submit Feedback
      </h3>
      
      <div className="flex gap-2">
        {feedbackTypes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
              type === value
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <textarea
          placeholder="Describe your feedback..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[100px]"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
      >
        <IconSend size={16} />
        Submit Feedback
      </button>
    </form>
  );
} 