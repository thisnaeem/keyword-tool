'use client';

import { IconFileSpreadsheet, IconFilePdf } from '@tabler/icons-react';

interface ExportButtonsProps {
  onExport: (type: 'csv' | 'pdf') => void;
}

export function ExportButtons({ onExport }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onExport('csv')}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <IconFileSpreadsheet className="w-4 h-4" />
        Export CSV
      </button>
      <button
        onClick={() => onExport('pdf')}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <IconFilePdf className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  );
} 