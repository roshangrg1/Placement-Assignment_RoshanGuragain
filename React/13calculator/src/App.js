


import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForSecondOperand) {
      setDisplayValue(num);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const handleOperatorClick = (op) => {
    if (operator && waitingForSecondOperand) {
      setOperator(op);
      return;
    }

    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(result);
      setFirstOperand(result);
    }

    setOperator(op);
    setWaitingForSecondOperand(true);
  };

  const performCalculation = () => {
    const operand1 = firstOperand;
    const operand2 = parseFloat(displayValue);

    if (isNaN(operand1) || isNaN(operand2)) return null;

    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        return null;
    }
  };

  const handleEqualClick = () => {
    const result = performCalculation();
    if (result !== null) {
      setDisplayValue(result);
      setFirstOperand(result);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <div className="answer">{displayValue}</div>
      <div className="buttons-all">
        <div className="row">
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('/')}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperatorClick('*')}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperatorClick('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={handleDecimalClick}>.</button>
          <button onClick={handleEqualClick}>=</button>
          <button onClick={() => handleOperatorClick('+')}>+</button>
        </div>
        <div className="row">
          <button onClick={handleClearClick}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default App;

