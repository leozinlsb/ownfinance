import styled from "styled-components";
import { Title } from "../Title";
import { FormCard } from "../FormCard"

const TableContainer = styled.div`
    margin-top: 20px;
    overflow-x: auto;
`

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const StyledHeader = styled.th`
    font-weight: bold;
    text-align: left;
    padding: 12px;
    border-bottom: 2px solid #ccc;
`

const StyledData = styled.td`
    padding: 12px;
    border-bottom: 1px solid #eee;
`

const TableHead = styled.thead``

const TableRow = styled.tr`
    transition: background 0.2s;
    &:hover {
        background-color: #f1f1f1;
    }
`
const TableBody = styled.tbody``




function TransactionHistory() {
    return (
        <FormCard>
            <Title>ÚLTIMAS TRANSAÇÕES</Title>
            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <StyledHeader>Descrição</StyledHeader>
                            <StyledHeader>Valor</StyledHeader>
                            <StyledHeader>Tipo</StyledHeader>
                            <StyledHeader>Data</StyledHeader>
                            <StyledHeader>Categoria</StyledHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <StyledData>GTA VI</StyledData>
                            <StyledData>550</StyledData>
                            <StyledData>Saída</StyledData>
                            <StyledData>29/06/2026</StyledData>
                            <StyledData>Entretenimento</StyledData>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        <TableRow>
                            <StyledData>OwnFinance</StyledData>
                            <StyledData>5.000</StyledData>
                            <StyledData>Entrada</StyledData>
                            <StyledData>30/06/2026</StyledData>
                            <StyledData>Salário</StyledData>
                        </TableRow>
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </FormCard>
    )
}

export default TransactionHistory;