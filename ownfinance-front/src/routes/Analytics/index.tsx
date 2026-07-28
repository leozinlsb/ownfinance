import styled from "styled-components";
import { Card } from "../../components/Card";
import { StyledInput, StyledSelect } from "../../components/FormElements"
import { useState } from "react";
import IncomeOutcomeChart from "../../components/Analytics/IncomeOutcomeChart";
import CategoryTrendChart from "../../components/Analytics/CategoryTrendChart";
import { Title } from "../../components/Title";
import GeneralDistributionChart from "../../components/Analytics/GeneralDistributionChart";
import { exportToPDF } from "../../utils/exportToPDF";
import { exportToExcel } from "../../utils/exportToExcel";

const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;
`

const ActionsContainer = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`

const AnalyticsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-top: 20px;
`
const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ExportButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #1a3c5a;
    background-color: #ffffff;
    border: 2px solid #1a3c5a;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    
    &:hover:not(:disabled) {
        background-color: #1a3c5a;
        color: #ffffff;
        transform: translateY(-2px); 
        box-shadow: 0 4px 12px rgba(26, 60, 90, 0.2);
    }
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        border-color: #a0aec0;
        color: #a0aec0;
        background-color: #f7fafc;
    }
`


function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState("6");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const [isExportingExcel, setIsExportingExcel] = useState(false);

    const handleDownloadPDF = async () => {
        try {
            setIsExportingPDF(true);

            const response = await fetch("http://localhost:8080/transactions");
            const data = await response.json();

            exportToPDF(data);
        } catch (error) {
            console.error("Erro ao gerar PDF: ", error);
        } finally {
            setIsExportingPDF(false);
        }
    };

    const handleDownloadExcel = async () => {
        try {
            setIsExportingExcel(true);

            const response = await fetch("http://localhost:8080/transactions");
            const data = await response.json();

            exportToExcel(data);
        } catch (error) {
            console.error("Erro ao gerar Excel: ", error);
        } finally {
            setIsExportingExcel(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card>
                <TopBar>
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
                    <ActionsContainer>
                        <ExportButton onClick={handleDownloadPDF} disabled={isExportingPDF}>
                            {isExportingPDF ? "Gerando PDF" : "Baixar Extrato Oficial PDF"}
                        </ExportButton>
                        <ExportButton onClick={handleDownloadExcel} disabled={isExportingExcel}>
                            {isExportingExcel ? "Gerando Planilha Excel" : "Baixar Planilha Excel"}
                        </ExportButton>
                    </ActionsContainer>
                </TopBar>
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
                    <Card id="distribution-chart">
                        <Title>DISTRIBUIÇÃO GERAL</Title>
                        <GeneralDistributionChart />
                    </Card>
                </RightColumn>
            </AnalyticsGrid>
        </div>
    )
}

export default Analytics;