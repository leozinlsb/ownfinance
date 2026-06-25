import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard/index.tsx"
import styled from "styled-components";
import IncomeIcon from './assets/entrada.svg';
import OutcomeIcon from './assets/saida.svg';
import BalanceIcon from './assets/saldo.svg';
import TransactionForms from "./components/TransactionForms";

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
  return (
    <AppContainer>
      <Header />
      <DashSection>
        <DashboardCard title="ENTRADAS" value="R$ 1.250,00" icon={IncomeIcon} />
        <DashboardCard title="SAÍDAS" value="R$ 1.250,00" icon={OutcomeIcon} />
        <DashboardCard title="SALDO" value="R$ 1.250,00" icon={BalanceIcon} />
      </DashSection>
      <TransactionsSection>
        <TransactionForms />
      </TransactionsSection>
    </AppContainer>
  )
}

export default App;