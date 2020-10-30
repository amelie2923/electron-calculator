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
    console.log('clear', target.value);
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
  console.log(calculator);
}

function inputDecimal(dot) {
  // If the 'displayValue' property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
  console.log(calculator);
}

//Handling Operators
function handleOperator(nextOperator) {
  //Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  //'parseFloat' converts the string contents of `displayValue`
  //to a floating-point number
  const inputValue = parseFloat(displayValue);
  //verify that 'firstOperand' is null and that the 'inputValue'
  // is not a 'NaN' value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}