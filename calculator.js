const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const cleartBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = 0;

function sendNumberValue (number){
    if (awaitingNextValue){
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
} else {

const  displayValue = calculatorDisplay.textContent;
calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}
  }
function addDecimal() { 
    if (awaitingNextValue) return;
    //if no decimal, add one

    if(!calculatorDisplay.textContent.includes('.')){ 
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}
const calculate = {
   '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
   '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
   '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
   '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
   '=' : (firstNumber, secondNumber) => firstNumber,
};
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Reset all values, display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click', resetAll);