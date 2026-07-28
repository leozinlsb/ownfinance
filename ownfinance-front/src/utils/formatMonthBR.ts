export function formatMonthBR(yearMonth: string): string {
    if (!yearMonth || !yearMonth.includes("-")) return yearMonth;

    const [year, month] = yearMonth.split("-");
    const monthIndex = parseInt(month, 10) - 1;

    const monthNames = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const monthName = monthNames[monthIndex] || month;
    const shortYear = year.slice(2); // transform "2026" to "26"

    return `${monthName}/${shortYear}`;
}