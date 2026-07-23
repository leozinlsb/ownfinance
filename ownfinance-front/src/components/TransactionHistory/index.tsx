import styled from "styled-components";
import DeleteIcon from '../../assets/deleteimg.svg'
import { Title } from "../Title";
import { Card } from "../Card"
import { formatDateBR } from "../../utils/formatDateBR";
import { StyledSelect } from "../../components/FormElements";
import { formatCurrency } from "../../utils/formatCurrency";

const TableContainer = styled.div`
    margin-top: 20px;
    overflow-x: auto;
`
const SelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
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

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.25);
    }
`

const EmptyState = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #777;
    font-size: 1.1rem;
`

const TableHead = styled.thead``

const TableRow = styled.tr`
    transition: background 0.2s;
    &:hover {
        background-color: #f1f1f1;
    }
`
const TableBody = styled.tbody``

interface AmountProps {
    $type: string;
}

const AmountData = styled(StyledData) <AmountProps>`
    font-weight: bold;
    white-space: nowrap;
    color: ${props => props.$type === "receita" ? "#2e7d32" : "#d32f2f"};
`


export interface Transaction {
    id?: number; //id didnt go to the Database, so it doesnt have an id yet
    description: string;
    amount: number;
    type: string;
    date: string;
    category: string;
    paymentMethod: string;
    totalInstallments: number;
    installmentNumber: number;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: number) => void;
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    selectedYear: string;
    onYearChange: (year: string) => void;
}

function TransactionHistory({ transactions, onDeleteTransaction, selectedMonth, onMonthChange, selectedYear, onYearChange }: TransactionHistoryProps) {
    return (
        <Card>
            <Title>ÚLTIMAS TRANSAÇÕES</Title>
            <SelectContainer>
                <StyledSelect id="month" name="month" value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
                    <option value="" disabled selected>Mês</option>
                    <option value="">Todos os Meses</option>
                    <option value="01">Janeiro</option>
                    <option value="02">Fevereiro</option>
                    <option value="03">Março</option>
                    <option value="04">Abril</option>
                    <option value="05">Maio</option>
                    <option value="06">Junho</option>
                    <option value="07">Julho</option>
                    <option value="08">Agosto</option>
                    <option value="09">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </StyledSelect>

                <StyledSelect id="year" name="year" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
                    <option value="" disabled selected>Ano</option>
                    <option value="2026">2026</option>
                </StyledSelect>
            </SelectContainer>
            <TableContainer>
                {transactions.length === 0 ? (
                    <EmptyState>
                        Nenhuma transação cadastrada ainda
                    </EmptyState>
                ) : (
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <StyledHeader>Descrição</StyledHeader>
                                <StyledHeader>Valor</StyledHeader>
                                <StyledHeader>Tipo</StyledHeader>
                                <StyledHeader>Data</StyledHeader>
                                <StyledHeader>Categoria</StyledHeader>
                                <StyledHeader>Ação</StyledHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <StyledData>{transaction.description}</StyledData>
                                    <AmountData $type={transaction.type}>{transaction.type === "receita" ? "+" : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </AmountData>
                                    <StyledData>{transaction.type}</StyledData>
                                    <StyledData>{formatDateBR(transaction.date)}</StyledData>
                                    <StyledData>{transaction.category}</StyledData>
                                    <StyledData>
                                        <DeleteButton onClick={() => transaction.id && onDeleteTransaction(transaction.id)}><img src={DeleteIcon} style={{ width: "40px", height: "40px" }} alt="Excluir" /></DeleteButton>
                                    </StyledData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                )}
            </TableContainer>
        </Card>
    )
}

export default TransactionHistory;