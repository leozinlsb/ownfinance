import type { Transaction } from "../TransactionHistory";
import { FormCard } from "../FormCard";
import { Title } from "../Title";
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "../../utils/formatCurrency";
import styled from "styled-components";

const COLORS = [
    "#10B981", // Verde Esmeralda
    "#3B82F6", // Azul Moderno
    "#F59E0B", // Laranja Âmbar
    "#EC4899", // Rosa Rosa
    "#8B5CF6", // Roxo Violeta
    "#EF4444", // Vermelho
    "#14B8A6", // Ciano
    "#6366F1"  // Índigo
];

const PIE_CONFIG = {
    cx: "50%",
    cy: "50%",
    innerRadius: 65,
    outerRadius: 90,
    paddingAngle: 4
};

const EmptyState = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #777;
    font-size: 1.1rem;
`

interface ExpenseChartProps {
    transactions: Transaction[];
}

function ExpenseChart({ transactions }: ExpenseChartProps) {

    const expensesByCategory = transactions.filter(t => t.type === "despesa")
    .reduce((acc, t) => {
        const categoryName = t.category;
        const amount = Number(t.amount);
        //if the category doesn't exist in the acc object, we initially create it with 0
        if(!acc[categoryName]) {
            acc[categoryName] = 0;
        }
        //we sum the transaction value in its respective category
        acc[categoryName] = acc[categoryName] + amount;

        return acc;
    }, {} as Record<string, number>); //we say to TS that acc is an object {string: number}

    const chartData = Object.keys(expensesByCategory).map((categoryName, index) => ({
        name: categoryName,
        value: expensesByCategory[categoryName],
        fill: COLORS[index % COLORS.length]
    }));

    return (
        <FormCard>
            <Title>DESPESAS POR CATEGORIA</Title>

            {chartData.length === 0 ? (
                <EmptyState>
                    Nenhuma despesa cadastrada no período para gerar o gráfico
                </EmptyState>
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                       {...PIE_CONFIG}
                        />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            )
        }
        </FormCard>
    )
}

export default ExpenseChart;