"use client";

import { IconFileSpreadsheet, IconPdf } from "@tabler/icons-react";

interface ExportButtonsProps {
  onExport: (type: "csv" | "pdf") => void;
}

function ExportButtons({ onExport }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onExport("csv")}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white  hover:bg-green-700 transition-colors"
      >
        <IconFileSpreadsheet size={16} className="w-4 h-4" />
        Export CSV
      </button>
      <button
        onClick={() => onExport("pdf")}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white  hover:bg-red-700 transition-colors"
      >
        <IconPdf size={16} className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  );
}

export default ExportButtons;
