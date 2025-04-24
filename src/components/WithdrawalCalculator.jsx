/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AnimatePresence, motion } from 'framer-motion';
import InputForm from './InputForm';
import ResultCard from './ResultCard';
import "../App.css"


const WithdrawalCalculator = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [deductionPercentage, setDeductionPercentage] = useState('');
  const [finalAmount, setFinalAmount] = useState(null);
  const [deductionDecimal, setDeductionDecimal] = useState(null);
  const [deductionValue, setDeductionValue] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {
    const withdrawal = parseFloat(withdrawalAmount);
    const deduction = parseFloat(deductionPercentage);

    if (isNaN(withdrawal) || isNaN(deduction)) {
      setErrorMessage('Please enter valid numeric values.');
      setShowError(true);
      return;
    }

    if (deduction < 0 || deduction > 100) {
      setErrorMessage('Deduction percentage must be between 0 and 100.');
      setShowError(true);
      return;
    }

    const decimal = deduction / 100;
    const deductionAmt = withdrawal * decimal;
    const result = withdrawal - deductionAmt;

    setDeductionDecimal(decimal);
    setDeductionValue(deductionAmt.toFixed(2));
    setFinalAmount(result.toFixed(2));
  };

  const handleClear = () => {
    setWithdrawalAmount('');
    setDeductionPercentage('');
    setFinalAmount(null);
    setDeductionDecimal(null);
    setDeductionValue(null);
  };

  return (
    <Container className="mt-5">
      <Card className={`p-4 cardBox`}>
        <h3 className="heading mb-4">Withdrawal Calculator</h3>
 
        <InputForm
          withdrawalAmount={withdrawalAmount}
          deductionPercentage={deductionPercentage}
          setWithdrawalAmount={setWithdrawalAmount}
          setDeductionPercentage={setDeductionPercentage}
          onCalculate={handleCalculate}
          onClear={handleClear}
        />

        <AnimatePresence>
          {finalAmount !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultCard
                withdrawalAmount={withdrawalAmount}
                deductionPercentage={deductionPercentage}
                deductionDecimal={deductionDecimal}
                deductionValue={deductionValue}
                finalAmount={finalAmount}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default WithdrawalCalculator;
