import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "../../types/analytics";


function IncomeOutcomeChart() {
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([])

    useEffect(() => {
        fetch("http://localhost:8080/transactions/analytics")
        .then(response => response.json())
        .then(data => setAnalytics(data))
        .catch(error => console.error("Erro no incomeOutcomeChart: ", error))
    }, []);

    const chartData = Object.values(
        analytics.reduce((acc, item) => {

            const month = item.month;
            // if month doesn't exist in our acc, he creates with 0 income and outcome
            if (!acc[month]) {
                acc[month] = { month, income: 0, outcome: 0 };
            }
            
            if (item.type === "receita") {
                acc[month].income += item.total;
            } else if (item.type === "despesa") {
                acc[month].outcome += item.total;
            }
            return acc;

        }, {} as Record<string, { month: string; income: number; outcome: number }>)
    )
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#2ecc71" name="Entrada" />
                <Bar dataKey="outcome" fill="#e74c3c" name="Saídas" />
            </BarChart>
        </ResponsiveContainer>
    )

}

export default IncomeOutcomeChart;