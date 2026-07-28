export function filterAnalyticsByPeriod<T extends { month?: string; date?: string }> (
    items: T[],
    period: string,
    startDate?: string,
    endDate?: string
): T[] {
    if (period === "custom") {
        if(!startDate || !endDate) return items;
        return items.filter(item => {
            const itemDate = item.date || `${item.month}-01`;
            return itemDate >= startDate && itemDate <= endDate;
        });
    }

    const monthsToKeep = parseInt(period, 10) || 6;

    // Take the available single months and sort them from newest to oldest.
    const months = Array.from(new Set(items.map(i => i.month || i.date?.substring(0, 7))))
        .filter(Boolean)
        .sort()
        .reverse()
        .slice(0, monthsToKeep);

    return items.filter(i => {
        const m = i.month || i.date?.substring(0, 7);
        return m && months.includes(m);
    });
}