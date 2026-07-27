import * as XLSX from "xlsx";
import type { Transaction } from "../components/TransactionHistory";
import { formatDateBR } from "./formatDateBR";

export function exportToExcel(transactions: Transaction[]){
    //Maps the data, formatting it to the Excel column names.
    const dataToExport = transactions.map( t => ({
        "Data": formatDateBR(t.date),
        "Descrição": t.description,
        "Categoria": t.category,
        "Tipo": t.type === "receita" ? "Receita" : "Despesa",
        "Valor (R$)": Number(t.amount)
    }));

    // Transform JSON into a Excel tab
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    worksheet["!cols"] = [
        { wch: 14 }, //Width column for Data
        { wch: 30 }, //Width column for Description
        { wch: 20 }, //Width column for Category
        { wch: 14 }, //Width column for Type
        { wch: 16 } //Width column for Value
    ];

    //Creates the work folder (workbook) and add our tab
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Extrato Oficial");

    //Do the .xlsx archive download on browser
    XLSX.writeFile(workbook, `extrato_ownfinance_${new Date().toISOString().slice(0, 10)}.xlsx`);


}