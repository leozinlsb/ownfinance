import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import type { AnalyticsData } from "../../types/analytics";

const CATEGORY_COLORS = ["#3498db", "#e67e22", "#9b59b6", "#1abc9c", "#f1c40f", "#e74c3c"]

function CategoryTrendChart() {
     const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
    
    useEffect(() => {
        fetch("http://localhost:8080/transactions/analytics")
        .then(response => response.json())
        .then(data => setAnalytics(data))
        .catch(error => console.error("Erro no categoryTrendChart: ", error))
    }, []);

    const expenses = analytics.filter(item => item.type === "despesa")

    const categories = Array.from(new Set(expenses.map(item => item.category)))

    const chartData = Object.values(
        expenses.reduce((acc, item) => {
            const month = item.month

            if(!acc[month]) {
                acc[month] = { month }
            }
            acc[month][item.category] = item.total;
            return acc;
        }, {} as Record<string, Record<string, string | number>>)
    )

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <XAxis dataKey="month"/>
                <YAxis />
                <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                <Legend />
                {categories.map((cat, index) => (
                    <Line 
                        key={cat}
                        type="monotone"
                        dataKey={cat}
                        name={cat}
                        stroke={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                        strokeWidth={3}
                    />
                ))}

            </LineChart>
        </ResponsiveContainer>

    )
}

export default CategoryTrendChart;