import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard/index.tsx"
import styled from "styled-components";

const AppContainer = styled.div`
    background-color: #e9e9e9;
    height: 100vh;
    width: 100vw;
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
`

const DashSection = styled.section`
    display: flex;
    justi
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