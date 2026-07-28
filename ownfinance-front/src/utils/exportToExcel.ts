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

    // ====================================================
    // FIRST TAB: OVERVIEW & DASHBOARD WITH GRAPH
    // ====================================================
    const wsOverview = workbook.addWorksheet("Visão Geral");

    // Header Banner
    wsOverview.mergeCells("A1:F2");
    const titleCell = wsOverview.getCell("A1");
    titleCell.value = "OWNFINANCE - RELATÓRIO EXECUTIVO";
    titleCell.font = { name: "Calibri", size: 16, bold: true, color: { argb: "FFFFFF" } };
    titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };

    // Income Card
    wsOverview.mergeCells("A4:B4");
    wsOverview.getCell("A4").value = "TOTAL ENTRADAS";
    wsOverview.getCell("A4").font = { bold: true, size: 9, color: { argb: "1E8449" } };
    wsOverview.getCell("A4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "E8F8F5" } };
    wsOverview.mergeCells("A5:B5");
    wsOverview.getCell("A5").value = income;
    wsOverview.getCell("A5").numFmt = '"R$"#,##0.00';
    wsOverview.getCell("A5").font = { bold: true, size: 12, color: { argb: "1E8449" } };
    wsOverview.getCell("A5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "E8F8F5" } };

    // Outcome Card
    wsOverview.mergeCells("C4:D4");
    wsOverview.getCell("C4").value = "TOTAL SAÍDAS";
    wsOverview.getCell("C4").font = { bold: true, size: 9, color: { argb: "C0392B" } };
    wsOverview.getCell("C4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FADBD8" } };
    wsOverview.mergeCells("C5:D5");
    wsOverview.getCell("C5").value = outcome;
    wsOverview.getCell("C5").numFmt = '"R$"#,##0.00';
    wsOverview.getCell("C5").font = { bold: true, size: 12, color: { argb: "C0392B" } };
    wsOverview.getCell("C5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FADBD8" } };

    // Balance Card
    wsOverview.mergeCells("E4:F4");
    wsOverview.getCell("E4").value = "SALDO FINAL";
    wsOverview.getCell("E4").font = { bold: true, size: 9, color: { argb: "1A3C5A" } };
    wsOverview.getCell("E4").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "EBF5FB" } };
    wsOverview.mergeCells("E5:F5");
    wsOverview.getCell("E5").value = balance;
    wsOverview.getCell("E5").numFmt = '"R$"#,##0.00';
    wsOverview.getCell("E5").font = { bold: true, size: 12, color: { argb: "1A3C5A" } };
    wsOverview.getCell("E5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "EBF5FB" } };

    // Category Table Header
    wsOverview.getCell("A7").value = "Categoria";
    wsOverview.getCell("A7").font = { bold: true, color: { argb: "FFFFFF" } };
    wsOverview.getCell("A7").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    wsOverview.getCell("B7").value = "Total Gasto";
    wsOverview.getCell("B7").font = { bold: true, color: { argb: "FFFFFF" } };
    wsOverview.getCell("B7").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };

    let currentRow = 8;
    Object.keys(categoryTotals).forEach(cat => {
        wsOverview.getCell(`A${currentRow}`).value = cat;
        wsOverview.getCell(`B${currentRow}`).value = categoryTotals[cat];
        wsOverview.getCell(`B${currentRow}`).numFmt = '"R$"#,##0.00';
        currentRow++;
    });

    //Capturing and inserting a donut chart into Excel
    const chartElement = document.getElementById("distribution-chart");
    if (chartElement) {
        try {
            const canvas = await html2canvas(chartElement, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
            const base64Image = canvas.toDataURL("image/png");

            const targetWidth = 360;
            const targetHeight = (canvas.height / canvas.width) * targetWidth;

            const imageId = workbook.addImage({
                base64: base64Image,
                extension: "png",
            });

            // Paste the donut chart image on H4 
            wsOverview.addImage(imageId, {
                tl: { col: 7, row: 3 },
                ext: { width: targetWidth, height: targetHeight }
            });
        } catch (e) {
            console.error("Erro ao inserir gráfico no Excel:", e);
        }
    }

    wsOverview.columns = [
        { width: 22 }, { width: 22 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }
    ];

    // ====================================================
    // SECOND TAB: ANALYTICAL STATEMENT
    // ====================================================
    const wsStatement = workbook.addWorksheet("Extrato Analítico");

    wsStatement.columns = [
        { header: "Data", key: "date", width: 15 },
        { header: "Descrição", key: "description", width: 32 },
        { header: "Categoria", key: "category", width: 22 },
        { header: "Tipo", key: "type", width: 15 },
        { header: "Forma de Pagamento", key: "paymentMethod", width: 22 },
        { header: "Valor", key: "amount", width: 18 }
    ];

    // Styling header
    wsStatement.getRow(1).eachCell(cell => {
        cell.font = { bold: true, color: { argb: "FFFFFF" } };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1A3C5A" } };
    });

    transactions.forEach(t => {
        const row = wsStatement.addRow({
            date: formatDateBR(t.date),
            description: t.description,
            category: t.category,
            type: t.type === "receita" ? "Receita" : "Despesa",
            paymentMethod: t.paymentMethod || "N/A",
            amount: Number(t.amount)
        });

        // Green for Income and Red for Outcome
        const typeCell = row.getCell("type");
        if (t.type === "receita") {
            typeCell.font = { color: { argb: "1E8449" }, bold: true };
        } else {
            typeCell.font = { color: { argb: "C0392B" }, bold: true };
        }

        row.getCell("amount").numFmt = '"R$"#,##0.00';
    });

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
