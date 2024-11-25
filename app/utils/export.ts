import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportToCSV = (keywords: any[], filename: string) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Keyword,Relevance,Marketplace\n"
    + keywords.map(k => `${k.keyword},${k.relevance},${k.marketplace}`).join("\n");
    
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (keywords: any[], filename: string) => {
  const doc = new jsPDF();
  
  const tableColumn = ["Keyword", "Relevance", "Marketplace"];
  const tableRows = keywords.map(k => [k.keyword, k.relevance, k.marketplace]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [51, 51, 51] }
  });

  doc.text("Keywords Report", 14, 15);
  doc.save(`${filename}.pdf`);
};
