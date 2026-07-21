import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard/index.tsx"
import styled from "styled-components";
import IncomeIcon from './assets/entrada.svg';
import OutcomeIcon from './assets/saida.svg';
import BalanceIcon from './assets/saldo.svg';
import TransactionForms from "./components/TransactionForms";
import TransactionHistory from "./components/TransactionHistory";
import ExpenseChart from "./components/ExpenseChart/index.tsx";
import { useState, useEffect } from "react";
import type { Transaction } from "./components/TransactionHistory"
import { formatCurrency } from "./utils/formatCurrency.ts"; //function that format the value to BRL

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
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [activeTab, setActiveTab] = useState('Lancamentos');


  console.log("Ano Selecionado:", selectedYear, " | Mês Selecionado:", selectedMonth);
  console.log("Exemplo de Data do Banco:", transactions[0]?.date);


  const filteredTransactions = transactions.filter(t => {
    const [year, month] = t.date.split("-")

    return year === selectedYear && (selectedMonth === "" || month === selectedMonth)
  });

  useEffect(() => {
    fetch("http://localhost:8080/transactions")
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error("Erro ao buscar transações: ", error));
  }, []);

  //const that handle with the auto-refresh when a new transaction is registered
  const handleAddTransaction = (newTransaction: Transaction[]) => {
    setTransactions(prevTransactions => [...prevTransactions, ...newTransaction]);
  };

  const handleDeleteTransaction = (id: number) => {
    fetch(`http://localhost:8080/transactions/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao excluir no servidor");
        }
        setTransactions(prev => prev.filter(t => t.id !== id));
      })
      .catch(error => console.error("Erro ao excluir transação: ", error));
  };

  const income = filteredTransactions
    .filter(t => t.type == "receita")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const outcome = filteredTransactions
    .filter(t => t.type == "despesa")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const total = income - outcome;

  return (
    <AppContainer>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Lancamentos' && (
        <>
          <DashSection>
            <DashboardCard title="ENTRADAS" value={formatCurrency(income)} icon={IncomeIcon} />
            <DashboardCard title="SAÍDAS" value={formatCurrency(outcome)} icon={OutcomeIcon} />
            <DashboardCard title="SALDO" value={formatCurrency(total)} icon={BalanceIcon} />
          </DashSection>
          <TransactionsSection>
            <div>
              <TransactionForms onAddTransaction={handleAddTransaction} />
              <ExpenseChart transactions={filteredTransactions} />
            </div>
            <TransactionHistory
              transactions={filteredTransactions}
              onDeleteTransaction={handleDeleteTransaction}
              selectedMonth={selectedMonth}
              onMonthChange={setSelectedMonth}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </TransactionsSection>
        </>
      )}

      {activeTab === 'Analises' && (
        <h1>
          PÁGINA EM CONSTRUÇÃO
        </h1>
      )}
    </AppContainer>
  )
}

export default App;