import Header from "./components/Header";
import styled from "styled-components";
import { useState } from "react";
import DashboardPage from "./routes/Dashboard";
import AnalyticsPage from "./routes/Analytics";


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
        <AnalyticsPage />
      )}
    </AppContainer>
  )
}

export default App;