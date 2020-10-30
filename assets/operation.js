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
    console.log('operator', target.value);
    return;
  }
  if (target.classList.contains('decimal')) {
    console.log('decimal', target.value);
    return;
  }
  if (target.classList.contains('all-clear')) {
    console.log('clear', target.value);
    return;
  }
  console.log('digit', target.value);
});

