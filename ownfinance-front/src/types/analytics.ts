export interface AnalyticsData {
    month: string;
    total: number;
    category: string;
    type: string;
}

export interface ChartProps {
    data: AnalyticsData[];
}