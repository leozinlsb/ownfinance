import ExcelJS from "exceljs";
import html2canvas from "html2canvas";
import type { Transaction } from "../components/TransactionHistory";
import { formatDateBR } from "./formatDateBR";

export async function exportToExcel(transactions: Transaction[]) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "OwnFinance";

    const income = transactions
        .filter(t => t.type === "receita")
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const outcome = transactions
        .filter(t => t.type === "despesa")
        .reduce((acc, t) => acc + Number(t.amount), 0);

    const balance = income - outcome;

    const categoryTotals = transactions
        .filter(t => t.type === "despesa")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
            return acc;
        }, {} as Record<string, number>);

    const ws = workbook.addWorksheet("Relatório Executivo");

    // Header Banner
    ws.mergeCells("A1:F2");
    const titleCell = ws.getCell("A1");
    titleCell.value = "OWNFINANCE - RELATÓRIO EXECUTIVO";
    titleCell.font = { name: "Calibri", size: 16, bold: true, color: { argb: "FFFFFF" } };
    titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };

    // Income Card
    ws.mergeCells("A4:B4");
    ws.getCell("A4").value = "TOTAL ENTRADAS";
    ws.getCell("A4").font = { bold: true, size: 9, color: { argb: "1E8449" } };
    ws.getCell("A4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "E8F8F5" } };
    ws.mergeCells("A5:B5");
    ws.getCell("A5").value = income;
    ws.getCell("A5").numFmt = '"R$"#,##0.00';
    ws.getCell("A5").font = { bold: true, size: 12, color: { argb: "1E8449" } };
    ws.getCell("A5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "E8F8F5" } };

    // Outcome Card
    ws.mergeCells("C4:D4");
    ws.getCell("C4").value = "TOTAL SAÍDAS";
    ws.getCell("C4").font = { bold: true, size: 9, color: { argb: "C0392B" } };
    ws.getCell("C4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FADBD8" } };
    ws.mergeCells("C5:D5");
    ws.getCell("C5").value = outcome;
    ws.getCell("C5").numFmt = '"R$"#,##0.00';
    ws.getCell("C5").font = { bold: true, size: 12, color: { argb: "C0392B" } };
    ws.getCell("C5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FADBD8" } };

    // Balance Card
    ws.mergeCells("E4:F4");
    ws.getCell("E4").value = "SALDO FINAL";
    ws.getCell("E4").font = { bold: true, size: 9, color: { argb: "1A3C5A" } };
    ws.getCell("E4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "EBF5FB" } };
    ws.mergeCells("E5:F5");
    ws.getCell("E5").value = balance;
    ws.getCell("E5").numFmt = '"R$"#,##0.00';
    ws.getCell("E5").font = { bold: true, size: 12, color: { argb: "1A3C5A" } };
    ws.getCell("E5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "EBF5FB" } };

    // Category Table Header
    ws.getCell("A7").value = "Categoria";
    ws.getCell("A7").font = { bold: true, color: { argb: "FFFFFF" } };
    ws.getCell("A7").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    ws.getCell("B7").value = "Total Gasto";
    ws.getCell("B7").font = { bold: true, color: { argb: "FFFFFF" } };
    ws.getCell("B7").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };

    let categoryRow = 8;
    Object.keys(categoryTotals).forEach(cat => {
        ws.getCell(`A${categoryRow}`).value = cat;
        ws.getCell(`B${categoryRow}`).value = categoryTotals[cat];
        ws.getCell(`B${categoryRow}`).numFmt = '"R$"#,##0.00';
        categoryRow++;
    });

    // Capture and Insert the Donut Chart
    const chartElement = document.getElementById("distribution-chart");
    if (chartElement) {
        try {
            const canvas = await html2canvas(chartElement, { scale: 3, useCORS: true, backgroundColor: "#ffffff" });
            const base64Image = canvas.toDataURL("image/png");

            const targetWidth = 360;
            const targetHeight = (canvas.height / canvas.width) * targetWidth;

            const imageId = workbook.addImage({
                base64: base64Image,
                extension: "png",
            });

            ws.addImage(imageId, {
                tl: { col: 7, row: 3 },
                ext: { width: targetWidth, height: targetHeight }
            });
        } catch (e) {
            console.error("Erro ao inserir gráfico no Excel:", e);
        }
    }

    // ====================================================
    // ANALYTICS STATEMENT SECTION
    // ====================================================
    // Calculate the starting line to avoid overlapping the graph or the categories.
    const statementStartRow = Math.max(categoryRow + 3, 20);

    // Statement section Banner
    ws.mergeCells(`A${statementStartRow}:F${statementStartRow}`);
    const statementBanner = ws.getCell(`A${statementStartRow}`);
    statementBanner.value = "DETALHAMENTO ANALÍTICO DAS TRANSAÇÕES";
    statementBanner.font = { name: "Calibri", size: 12, bold: true, color: { argb: "FFFFFF" } };
    statementBanner.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    statementBanner.alignment = { vertical: "middle", horizontal: "center" };

    // Statement column Headers
    const headers = ["Data", "Descrição", "Categoria", "Tipo", "Forma de Pagamento", "Valor (R$)"];
    const headerRowNumber = statementStartRow + 1;

    headers.forEach((headerText, colIndex) => {
        const cell = ws.getRow(headerRowNumber).getCell(colIndex + 1);
        cell.value = headerText;
        cell.font = { bold: true, color: { argb: "FFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "2C3E50" } };
    });

    // Inserting Transaction lines
    let currentRow = headerRowNumber + 1;
    transactions.forEach(t => {
        const row = ws.getRow(currentRow);
        
        row.getCell(1).value = formatDateBR(t.date);
        row.getCell(2).value = t.description;
        row.getCell(3).value = t.category;
        row.getCell(4).value = t.type === "receita" ? "Receita" : "Despesa";
        row.getCell(5).value = t.paymentMethod || "N/A";
        row.getCell(6).value = Number(t.amount);

        // Green color for Income and Red color for Outcome
        const typeCell = row.getCell(4);
        if (t.type === "receita") {
            typeCell.font = { color: { argb: "1E8449" }, bold: true };
        } else {
            typeCell.font = { color: { argb: "C0392B" }, bold: true };
        }

        row.getCell(6).numFmt = '"R$"#,##0.00';
        currentRow++;
    });

    // Definimos as larguras das colunas
    ws.columns = [
        { width: 15 }, // Date
        { width: 32 }, // Description
        { width: 22 }, // Category
        { width: 15 }, // Type
        { width: 22 }, // Payment Method
        { width: 18 }  // Value
    ];

    // === GENERATE AND DOWNLOAD ===
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `relatorio_executivo_ownfinance_${new Date().toISOString().slice(0, 10)}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}
