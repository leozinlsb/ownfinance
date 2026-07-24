import styled from "styled-components";
import { Card } from "../../components/Card";
import { StyledInput, StyledSelect } from "../../components/FormElements"
import { useState } from "react";
import IncomeOutcomeChart from "../../components/Analytics/IncomeOutcomeChart";
import CategoryTrendChart from "../../components/Analytics/CategoryTrendChart";
import { Title } from "../../components/Title";
import GeneralDistributionChart from "../../components/Analytics/GeneralDistributionChart";

const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const AnalyticsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr; /* Coluna esquerda (2 partes) vs Direita (1 parte) */
    gap: 20px;
    margin-top: 20px;
`;
const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;


function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState("6");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div style={{ padding: "20px" }}>
            <Card>
                <FilterContainer>
                    <StyledSelect
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="3">Últimos 3 Meses</option>
                        <option value="6">Últimos 6 Meses</option>
                        <option value="12">Últimos 12 Meses</option>
                        <option value="custom">Selecione o Intervalo de Tempo</option>
                    </StyledSelect>

                    {selectedPeriod === "custom" && (
                        <>
                            <StyledInput
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span>até</span>
                            <StyledInput
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </>
                    )}
                </FilterContainer>
            </Card>

            <AnalyticsGrid>
                <LeftColumn>
                    <Card>
                        <Title>COMPARATIVO ENTRADA VS SAÍDA</Title>
                        <IncomeOutcomeChart />
                    </Card>

                    <Card>
                        <Title>EVOLUÇÃO POR CATEGORIA NO TEMPO</Title>
                        <CategoryTrendChart />
                    </Card>
                </LeftColumn>

                <RightColumn>
                    <Card>
                        <Title>DISTRIBUIÇÃO GERAL</Title>
                        <GeneralDistributionChart />
                    </Card>
                </RightColumn>
            </AnalyticsGrid>
        </div>
    )
}

export default Analytics;