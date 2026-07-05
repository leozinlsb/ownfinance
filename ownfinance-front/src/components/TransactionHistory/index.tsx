import styled from "styled-components";
import DeleteIcon from '../../assets/deleteimg.svg'
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

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    transition: transform 0.2s;
    &:hover {
        transform: scale(1.25);
    }
`;

const TableHead = styled.thead``

const TableRow = styled.tr`
    transition: background 0.2s;
    &:hover {
        background-color: #f1f1f1;
    }
`
const TableBody = styled.tbody``


export interface Transaction {
    id?: number; //id didnt go to the Database, so it doesnt have an id yet
    description: string;
    amount: number;
    type: string;
    date: string;
    category: string;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
    onDeleteTransaction: (id: number) => void;
}

function TransactionHistory({transactions, onDeleteTransaction}: TransactionHistoryProps) {
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
                            <StyledHeader>Ação</StyledHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <StyledData>{transaction.description}</StyledData>
                                <StyledData>R${transaction.amount}</StyledData>
                                <StyledData>{transaction.type}</StyledData>
                                <StyledData>{transaction.date}</StyledData>
                                <StyledData>{transaction.category}</StyledData>
                                <StyledData>
                                    <DeleteButton onClick={() => transaction.id && onDeleteTransaction(transaction.id)}><img src= {DeleteIcon} style={{ width: "40px", height: "40px"}} alt="Excluir"/></DeleteButton>
                                </StyledData>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
        </FormCard>
    )
}

export default TransactionHistory;