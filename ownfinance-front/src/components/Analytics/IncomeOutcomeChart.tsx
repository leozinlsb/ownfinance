import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type {  ChartProps } from "../../types/analytics";
import { formatMonthBR } from "../../utils/formatMonthBR";
import { formatCurrency } from "../../utils/formatCurrency";


function IncomeOutcomeChart({ data }: ChartProps) {

    const chartData = Object.values(
        data.reduce((acc, item) => {

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
                <XAxis dataKey="month" tickFormatter={formatMonthBR}/>
                <YAxis />
                <Tooltip labelFormatter={(label) => formatMonthBR(String(label))} formatter={(value) => formatCurrency(Number(value))}/>
                <Legend />
                <Bar dataKey="income" fill="#2ecc71" name="Entrada" />
                <Bar dataKey="outcome" fill="#e74c3c" name="Saídas" />
            </BarChart>
        </ResponsiveContainer>
    )

}

export default IncomeOutcomeChart;