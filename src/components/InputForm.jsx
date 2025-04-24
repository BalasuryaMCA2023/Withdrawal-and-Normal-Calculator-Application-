import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../App.css'; // ✅ Correct way

const InputForm = ({
  withdrawalAmount,
  deductionPercentage,
  setWithdrawalAmount,
  setDeductionPercentage,
  onCalculate,
  onClear,
}) => {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="label">
          Withdrawal Amount
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            placeholder="Enter withdrawal amount"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={4} className="label">
          Deduction Percentage (%)
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            type="number"
            value={deductionPercentage}
            onChange={(e) => setDeductionPercentage(e.target.value)}
            placeholder="Enter deduction percentage"
          />
        </Col>
      </Form.Group>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={onCalculate}>
            Calculate
          </Button>{' '}
          <Button variant="outline-secondary" onClick={onClear}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputForm;
