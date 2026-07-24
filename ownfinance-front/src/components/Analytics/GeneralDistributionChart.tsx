import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import type { AnalyticsData } from "../../types/analytics";
import { formatCurrency } from "../../utils/formatCurrency";
import styled from "styled-components";

const COLORS = ["#1a3c5a", "#e74c3c", "#2ecc71", "#9b59b6", "#f39c12", "#34495e"];

const ChartWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 320px;
`;

const CenterLabel = styled.div`
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none; 
`;

const LabelSpan = styled.span`
    display: block;
    font-size: 14px;
    color: #7f8c8d;
    font-weight: 600;
`;

const LabelStrong = styled.strong`
    display: block;
    font-size: 18px;
    color: #2c3e50;
    font-weight: bold;
`;

function GeneralDistributionChart() {
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/transactions/analytics")
        .then(response => response.json())
        .then(data => setAnalytics(data))
        .catch(error => console.error("Erro no donut chart: ", error))
    }, []);

    const expenses = analytics.filter(item => item.type === "despesa");

    const totalExpenses = expenses.reduce((acc, item) => acc + item.total, 0);

    const categoryTotals = expenses.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.total;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(categoryTotals).map((category, index) => ({
        name: category,
        value: categoryTotals[category],
        fill: COLORS[index % COLORS.length]
    }));
    
    return (
        <ChartWrapper>
            <CenterLabel>
                <LabelSpan>Total Despesas</LabelSpan>
                <LabelStrong>{formatCurrency(totalExpenses)}</LabelStrong>
            </CenterLabel>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={4}               
                    />
                    <Tooltip formatter={(val) => formatCurrency(Number(val))} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
};

export default GeneralDistributionChart;