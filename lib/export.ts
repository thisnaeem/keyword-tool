import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const getDifficultyLabel = (difficulty: number) => {
  if (difficulty <= 3) return 'Easy';
  if (difficulty <= 7) return 'Medium';
  return 'Hard';
};

const getCompetitionLabel = (competition: number) => {
  if (competition <= 3) return 'Low';
  if (competition <= 7) return 'Medium';
  return 'High';
};

export const exportToCSV = (keywords: any[], filename: string) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Keyword,Keyword Difficulty (KD),Competition Level\n"
    + keywords.map(k => `${k.keyword},${getDifficultyLabel(k.difficulty)},${getCompetitionLabel(k.competition)}`).join("\n");
    
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
  
  const tableColumn = ["Keyword", "Keyword Difficulty (KD)", "Competition Level"];
  const tableRows = keywords.map(k => [
    k.keyword, 
    getDifficultyLabel(k.difficulty),
    getCompetitionLabel(k.competition)
  ]);

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
