import Header from "./components/Header";
import styled from "styled-components";
import { useState } from "react";
import DashboardPage from "./routes/Dashboard";


const AppContainer = styled.div`
    height: 100vh;
`

function App() {
  const [activeTab, setActiveTab] = useState('Lancamentos');

  return (
    <AppContainer>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Lancamentos' && (
        <DashboardPage />
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