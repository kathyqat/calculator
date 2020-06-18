function add(x, y){
	return x + y;
}

function subtract(x, y){
	return x - y;
}

function multiply(x, y){
	return x * y;
}

function divide (x, y){
	return x / y;
}

function operate (operator, x, y){
    return operator(x, y);
}

const numberButtons = document.querySelectorAll('.number');
const display = document.querySelector('#display');
const clearButton = document.querySelector('#AC')
let displayValue = '';

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let number = button.getAttribute('id');
    displayValue += number;
    display.textContent = displayValue;
  });
});

clearButton.addEventListener('click', () => {
  displayValue = '';
  display.textContent = '';
});