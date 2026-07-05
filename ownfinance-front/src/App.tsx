import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard/index.tsx"
import styled from "styled-components";
import IncomeIcon from './assets/entrada.svg';
import OutcomeIcon from './assets/saida.svg';
import BalanceIcon from './assets/saldo.svg';
import TransactionForms from "./components/TransactionForms";
import TransactionHistory from "./components/TransactionHistory";
import { useState, useEffect } from "react";
import type { Transaction } from "./components/TransactionHistory"

const AppContainer = styled.div`
    height: 100vh;
`

const DashSection = styled.section`
    display: flex;
    width: auto;
    justify-content: center;
    gap: 30px;
`

const TransactionsSection = styled.section`
    display: flex;
    width: auto;
    justify-content: center;
    gap: 30px;
`

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/transactions")
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error("Erro ao buscar transações: ", error));
  }, []);

  //const that handle with the auto-refresh when a new transaction is registered
  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
  };

  const income = transactions.filter(t => t.type == "receita")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const outcome = transactions.filter(t => t.type == "despesa")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const total = income - outcome;

  //function that format the numbers on the Dashboard cards
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  return (
    <AppContainer>
      <Header />
      <DashSection>
        <DashboardCard title="ENTRADAS" value={formatCurrency(income)} icon={IncomeIcon} />
        <DashboardCard title="SAÍDAS" value={formatCurrency(outcome)} icon={OutcomeIcon} />
        <DashboardCard title="SALDO" value={formatCurrency(total)} icon={BalanceIcon} />
      </DashSection>
      <TransactionsSection>
        <TransactionForms onAddTransaction={handleAddTransaction} />
        <TransactionHistory transactions={transactions} />
      </TransactionsSection>
    </AppContainer>
  )
}

export default App;