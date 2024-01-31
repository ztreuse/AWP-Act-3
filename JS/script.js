const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.result');
display.style.textAlign = 'right';
display.style.fontFamily = 'Arial, sans-serif';
display.style.fontSize = '2rem';
display.style.padding = '0.5rem';

let currentOperation = '';
let currentInput = '';
let shouldReset = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.textContent) {
            case 'C':
                resetCalculator();
                break;
            case '=':
                calculate();
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                setOperation(button.textContent);
                break;
            case '<':
                backspace();
                break;
            default:
                addNumber(button.textContent);
                break;
        }
    });
});

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

let secondInput = '';

function setOperation(operator) {
    if (currentOperation !== '') calculate();
    currentInput = display.textContent;
    secondInput = '';
    currentOperation = operator;
    shouldReset = true;
    hasCalculated = false; // Set hasCalculated to false
    display.textContent += operator;
}

let hasCalculated = false;

function addNumber(number) {
    if (hasCalculated) {
        resetCalculator();
        hasCalculated = false;
    }
    if (shouldReset) {
        secondInput += number;
        display.textContent = currentInput + currentOperation + secondInput; // Show the first number, operator, and the entered number
    } else {
        display.textContent += number;
    }
}

function calculate() {
    let result;
    const input = parseFloat(currentInput);
    const current = parseFloat(secondInput);

    switch (currentOperation) {
        case '+':
            result = input + current;
            break;
        case '-':
            result = input - current;
            break;
        case 'x':
            result = input * current;
            break;
        case '/':
            result = input / current;
            break;
        default:
            return;
    }

    display.textContent = result;
    currentOperation = '';
    hasCalculated = true;
}

function resetCalculator() {
    display.textContent = '';
    currentOperation = '';
    currentInput = '';
    secondInput = ''; // Reset secondInput
}
