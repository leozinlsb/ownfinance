import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard/index.tsx"
import styled from "styled-components";

const AppContainer = styled.div`
    height: 100vh;
`

const DashSection = styled.section`
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
        <DashboardCard title="ENTRADAS" value="R$ 1.250,00" icon="" />
        <DashboardCard title="SAÍDAS" value="R$ 1.250,00" icon="" />
        <DashboardCard title="SALDO" value="R$ 1.250,00" icon="" />
      </DashSection>
    </AppContainer>
  )
}

export default App;