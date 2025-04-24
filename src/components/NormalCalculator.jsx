import React, { useState, useEffect, useCallback } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const NormalCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (val) => {
    setExpression((prev) => prev + val);
  };

  const calculate = useCallback(() => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
      console.error('Calculation Error:', error.message);
    }
  }, [expression]);

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const handleShare = () => {
    if (!expression || !result) {
      alert('No result to share.');
      return;
    }

    const message = `🧮 Here's my calculation from Normal Calculator:\n\nExpression: ${expression}\nResult: ${result}\n\nTry it yourself: https://withdrawal-and-normal-calculator-application.vercel.app/`;

    if (navigator.share) {
      navigator.share({
        title: 'Normal Calculator Result',
        text: message,
      }).catch((err) => console.error('Sharing failed:', err));
    } else {
      navigator.clipboard.writeText(message).then(() => {
        alert('Calculation copied to clipboard. Share it anywhere!');
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        handleClick(event.key);
      } else if (['+', '-', '*', '/'].includes(event.key)) {
        handleClick(event.key);
      } else if (event.key === 'Enter') {
        calculate();
      } else if (event.key === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (event.key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [calculate]);

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

  return (
    <div className="cardBox p-3 my-4">
      <h5 className="heading mb-3">Normal Calculator</h5>

      <InputGroup className="mb-2">
        <Form.Control
          value={expression}
          placeholder="Enter calculation"
          readOnly
        />
      </InputGroup>

      <div className="d-flex flex-wrap gap-2">
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            variant={btn === '=' ? 'success' : 'outline-dark'}
            onClick={() => btn === '=' ? calculate() : handleClick(btn)}
            style={{ width: '60px' }}
          >
            {btn}
          </Button>
        ))}
        <Button variant="outline-danger" onClick={clear} style={{ width: '60px' }}>
          C
        </Button>
        <Button variant="primary" onClick={handleShare} style={{ width: 'auto' }}>
          Share
        </Button>
      </div>

      {result !== '' && (
        <div className="resultBox mt-3">
          <div className="resultText">
            Result: <span className="highlight">{result}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalCalculator;
