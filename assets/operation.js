//Calculator
//To construct a valid arithmetic expression : first operand(), operator() and second operand()

//Create an object calculator to save the values an create a valid expression
const calculator = {
  //string value that represents the input of the user or the result of an operation
  displayValue: '0',
  //first operand for any expression set to null
  firstOperand: null,
  //store the operator for an expression, set to null
  operator: null,
  //check if the first operand and the operator have ben cliked - set to false but if it's true, the next numbers that the user will enter constitute the second operand
  waitingForSecondOperand: false,
};

//Set displayValue on the calculator screen
function updateDisplay() {
  //select element with calculator-screen and stock in display variable
  const display = document.querySelector('.calculator-screen');
  //update the value of the element with the content of displayValue variable
  display.value = calculator.displayValue;
}

updateDisplay();

//Handle key presses
//4 sets of keys on the calculator : digits(0-9), operators(+, -, x, =), a decimal point (.) and reset key (AC)


const keys = document.querySelector('.calculator-keybord');
//listening for a click event on the element with a class 'calculator-keybord'
//every keys on the calculator are children of this element so click event filters them too (= event delegation)
//Access the clicked element
keys.addEventListener('click', (event) => {
  //extract the target property of the click
  //target variable is an object that represents the element that was clicked
  const { target } = event;
  //Check if the clicked element is a button
  //If not, exit from the function
  if (!target.matches('button')) {
    return;
  }
  //Verify if specify class is in the list of class with contains(String)
  if (target.classList.contains('operator')) {
    // console.log('operator', target.value);
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')) {
    // console.log('decimal', target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')) {
    // console.log('clear', target.value);
    resetCalculator();
    updateDisplay();
    return;
  }
  // console.log('digit', target.value);
  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    //if true, displayValue property is overwritten with the digit that was clicked
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    //Overwrite 'displayValue' if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log("Object with values", calculator);
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    //waitingForSecondOperand is set to true and a decimal point is entered, displayValue becomes 0. and waitingForSecondOperand is set to false
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return
  }
  //If the 'displayValue' property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    //Append the decimal point
    calculator.displayValue += dot;
  }
  // console.log(calculator);
}

//Handling Operators
function handleOperator(nextOperator, result) {
  //Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  //'parseFloat' converts the string contents of `displayValue`
  //to a floating-point number
  const inputValue = parseFloat(displayValue);
  //Check if an operator already exists and if waitingForSecondOperand is set to true. If true, value of the operator property is replaced with the new operator
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    // console.log(calculator);
    return;
  }
  //verify that 'firstOperand' is null and that the 'inputValue'
  //is not a 'not a number' value
  if (firstOperand == null && !isNaN(inputValue)) {
    //Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    //checks if the operator property has been assigned an operator
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    if (operator !== '=') {
      storeResults(firstOperand, operator, displayValue, result);
    }
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }
  return secondOperand;
}


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function storeResults(firstOperand, operator, displayValue, result) {
  const historical = localStorage.getItem('operations');
  const operation = firstOperand + operator + displayValue + ' = ' + result;
  const calculHisto = operation;
  console.log(result)

  if (historical) {
    const operations = JSON.parse(historical);
    if (operations.length < 10) {
      operations.push(calculHisto);
      const operationsString = JSON.stringify(operations);
      localStorage.setItem('operations', operationsString);
    } else {
      for (let index = 9; index > 0; index--) {
        operations[index] = operations[index - 1];
      }
      operations[0] = operation;
      const operationsString = JSON.stringify(operations);
      localStorage.setItem('operations', operationsString);
    }
  } else {
    const operations = [];
    operations.push(calculHisto);
    const operationsString = JSON.stringify(operations);
    localStorage.setItem('operations', operationsString);
  }
  displayResults();
}

function displayResults() {
  const resultsList = document.getElementById('display-operations');
  const historical = localStorage.getItem('operations');
  const operations = JSON.parse(historical);
  if (operations.length > 0) {
    resultsList.innerHTML = '';
    operations.forEach(operation => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = operation;
      resultsList.append(li);
    });
  }
}