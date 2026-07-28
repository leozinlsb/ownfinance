import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import type { Transaction } from "../components/TransactionHistory";
import { formatCurrency } from "./formatCurrency";
import { formatDateBR } from "./formatDateBR";

interface jsPDFWithAutoTable extends jsPDF {
    lastAutoTable?: {
        finalY: number;
    };
}

export async function exportToPDF(transactions: Transaction[]) {
    const doc = new jsPDF();

    // === 1. HEADER ===
    doc.setFillColor(26, 60, 90);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("OWNFINANCE", 14, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Relatório Executivo de Inteligência Financeira", 14, 25);
    doc.text(`Emissão: ${new Date().toLocaleDateString("pt-BR")}`, 150, 25);

    const income = transactions
        .filter(t => t.type === "receita")
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const outcome = transactions
        .filter(t => t.type === "despesa")
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const balance = income - outcome;

    // === 3. KPI CARDS (DASHBOARD STYLE) ===
    // INCOME
    doc.setFillColor(235, 247, 240); 
    doc.roundedRect(14, 36, 58, 22, 3, 3, "F");
    doc.setTextColor(39, 174, 96);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("ENTRADAS", 20, 43);
    doc.setFontSize(11);
    doc.text(formatCurrency(income), 20, 52);

    // OUTCOME
    doc.setFillColor(253, 237, 236); 
    doc.roundedRect(76, 36, 58, 22, 3, 3, "F");
    doc.setTextColor(192, 57, 43);
    doc.setFontSize(8);
    doc.text("SAÍDAS", 82, 43);
    doc.setFontSize(11);
    doc.text(formatCurrency(outcome), 82, 52);

    // BALANCE
    doc.setFillColor(235, 245, 251); // Fundo azul claro
    doc.roundedRect(138, 36, 58, 22, 3, 3, "F");
    doc.setTextColor(41, 128, 185);
    doc.setFontSize(8);
    doc.text("SALDO FINAL", 144, 43);
    doc.setFontSize(11);
    doc.text(formatCurrency(balance), 144, 52);

    // === 4. DONUT CHART CAPTURE ===
    const chartElement = document.getElementById("distribution-chart");

    if (chartElement) {
        try {
            const canvas = await html2canvas(chartElement, { scale: 3, backgroundColor: "#ffffff" });
            const imgData = canvas.toDataURL("image/png");
            
            const imgWidth = 80;
            const imgHeight = (canvas.height / canvas.width) * imgWidth;

            // Insert the image on the right side of the PDF
            doc.addImage(imgData, "PNG", 115, 66, imgWidth, imgHeight);
        } catch (e) {
            console.error("Erro ao capturar imagem do gráfico:", e);
        }
    }

    // === 5. CATEGORY TABLE (LEFT SIDE) ===
    const categoryTotals = transactions
        .filter(t => t.type === "despesa")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {} as Record<string, number>);

    const categoryRows = Object.keys(categoryTotals).map(cat => [
        cat,
        formatCurrency(categoryTotals[cat])
    ]);

    autoTable(doc, {
        startY: 68,
        margin: { left: 14 },
        tableWidth: 95,
        head: [["Categoria", "Total Gasto"]],
        body: categoryRows,
        headStyles: { fillColor: [26, 60, 90], textColor: [255, 255, 255] },
        styles: { fontSize: 8, cellPadding: 2 }
    });

    // === 6. STATEMENT TABLE (BASEBOARD) ===
    const statementRows = transactions.map(t => [
        formatDateBR(t.date),
        t.description,
        t.category,
        t.type === "receita" ? "Receita" : "Despesa",
        formatCurrency(Number(t.amount))
    ]);

    // Grab the highest Y position (where the grafic or mini-table ended)
    const pdfDoc = doc as jsPDFWithAutoTable;
    const finalY = pdfDoc.lastAutoTable?.finalY ?? 135;
    const startYTable = Math.max(finalY + 10, 140);

    doc.setTextColor(26, 60, 90);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Detalhamento Analítico das Transações", 14, startYTable - 3);

    autoTable(doc, {
        startY: startYTable,
        margin: { left: 14, right: 14 },
        head: [["Data", "Descrição", "Categoria", "Tipo", "Valor"]],
        body: statementRows,
        headStyles: { fillColor: [26, 60, 90], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [248, 249, 250] },
        didParseCell: function (data) {
            // Style the type column with vibrant color (Green for Income / Red for Outcome)
            if (data.section === 'body' && data.column.index === 3) {
                if (data.cell.raw === 'Receita') {
                    data.cell.styles.textColor = [39, 174, 96];
                    data.cell.styles.fontStyle = 'bold';
                } else {
                    data.cell.styles.textColor = [192, 57, 43];
                    data.cell.styles.fontStyle = 'bold';
                }
            }
        },
        styles: { fontSize: 8, cellPadding: 3 }
    });

    // Save the PDF
    doc.save(`relatorio_executivo_ownfinance_${new Date().toISOString().slice(0, 10)}.pdf`);
}
