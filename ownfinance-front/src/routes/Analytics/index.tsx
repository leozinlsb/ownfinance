import styled from "styled-components";
import { Card } from "../../components/Card";
import { StyledInput, StyledSelect, SubmitButton} from "../../components/FormElements"
import { useState } from "react";

const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`


function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState("6");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <Card>
            <FilterContainer>
                <StyledSelect
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                    <option value="">Últimos 3 Meses</option>
                    <option value="">Últimos 6 Meses</option>
                    <option value="">Últimos 12 Meses</option>
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
    )
}

export default Analytics;