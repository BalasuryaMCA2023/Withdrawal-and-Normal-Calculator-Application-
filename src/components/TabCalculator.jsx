// components/TabsCalculator.jsx
import React from 'react';
import { Tabs, Tab, Container, Card } from 'react-bootstrap';
import WithdrawalCalculator from './WithdrawalCalculator';
import NormalCalculator from './NormalCalculator';

const TabsCalculator = () => {
  return (
    <Container className="py-4">
      <Card className="p-3 cardBox">
        <h3 className="heading mb-4">Smart Calculators</h3>
        <Tabs defaultActiveKey="withdrawal" id="calculator-tabs" className="mb-3" justify>
          <Tab eventKey="withdrawal" title="Withdrawal Calculator">
            <WithdrawalCalculator />
          </Tab>
          <Tab eventKey="normal" title="Normal Calculator">
            <NormalCalculator />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
};

export default TabsCalculator;
