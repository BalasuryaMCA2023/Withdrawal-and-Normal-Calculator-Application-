import React, { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import HistoryList from './HistoryStoreage';

const CalculatorHistory = () => {
  const [activeTab, setActiveTab] = useState('withdrawal');

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">Calculation History</h3>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3 justify-content-center"
        fill
      >
        <Tab eventKey="withdrawal" title="Withdrawal History">
          <HistoryList type="withdrawalHistory" />
        </Tab>

        <Tab eventKey="normal" title="Normal Calculator History">
          <HistoryList type="normalHistory" />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CalculatorHistory;
