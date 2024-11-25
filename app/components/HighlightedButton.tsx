import { IconBrandPatreon, IconDownload } from '@tabler/icons-react';

interface HighlightedButtonProps {
  icon: typeof IconBrandPatreon | typeof IconDownload;
  text: string;
  href: string;
}

export function HighlightedButton({ icon: Icon, text, href }: HighlightedButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg 
                hover:bg-primary/90 transition-colors animate-pulse hover:animate-none"
    >
      <Icon className="w-5 h-5" />
      {text}
    </a>
  );
} 