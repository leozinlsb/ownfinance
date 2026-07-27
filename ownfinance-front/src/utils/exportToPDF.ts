import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Transaction } from "../components/TransactionHistory";
import { formatCurrency } from "./formatCurrency";
import { formatDateBR } from "./formatDateBR";

export function exportToPDF(transactions: Transaction[]){
    const doc = new jsPDF();

    doc.setFillColor(26, 60, 90);
    doc.rect(0 , 0, 210, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("OWNFINANCE - Extrato Oficial", 14, 18);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Emissão: ${new Date().toLocaleDateString("pt-BR")}`, 155, 18);

    const income = transactions
        .filter(t => t.type === "receita")
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const outcome = transactions
    .filter(t => t.type === "despesa")
    .reduce((acc, t) => acc + Number(t.amount), 0);

    const balance = income - outcome;

    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(
        `Entradas: ${formatCurrency(income)}   |   Saídas: ${formatCurrency(outcome)}   |   Saldo: ${formatCurrency(balance)}`,
        14,
        36
    );

    const tableRows = transactions.map(t => [
        formatDateBR(t.date),
        t.description,
        t.category,
        t.type === "receita" ? "Receita" : "Despesa",
        formatCurrency(Number(t.amount))
    ])

    autoTable(doc, {
        startY: 42,
        head: [["Data", "Descrição", "Categoria", "Tipo", "Valor"]],
        body: tableRows,
        headStyles: {
            fillColor: [26, 60, 90],
            textColor: [255, 255, 255],
            fontStyle: "bold"
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        styles: {
            fontSize: 9,
            cellPadding: 3
        }
    });

    doc.save(`extrato_ownfinance_${new Date().toISOString().slice(0, 10)}.pdf`);
}