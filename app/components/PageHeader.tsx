import { IconBrandPatreon, IconDownload } from '@tabler/icons-react';
import { HighlightedButton } from './HighlightedButton';

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-4">
        <HighlightedButton
          icon={IconBrandPatreon}
          text="Support on Patreon"
          href="https://www.patreon.com/your_username"
        />
        <HighlightedButton
          icon={IconDownload}
          text="Download CSV Tool"
          href="/download/csv-tool"
        />
      </div>
    </div>
  );
} 