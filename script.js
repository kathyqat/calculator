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

const display = document.querySelector('#display');
const clearButton = document.querySelector('#AC');
let displayValue = '';
let operation = '';
let num1, num2;

function inputNumbers(){
    const numberButtons = document.querySelectorAll('.number');

    numberButtons.forEach((button) => {
      button.addEventListener('click', () => {
        let number = button.getAttribute('id');

        if (displayValue.length < 34){
            displayValue += number;
        };
        display.textContent = displayValue;
        display.style.borderColor = '#4285f4';
      });
    });
  }

function inputAction(){
    const actionButtons = document.querySelectorAll('.action');
    
    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            num1 = Number(displayValue);
            displayValue = '';
            operation = button.getAttribute('id');

            switch (operation){
                case '/':
                operation = divide;
                break;
                case '*':
                operation = multiply;
                break;
                case '-':
                operation = subtract;
                break;
                case '+':
                operation = add;
                break;
                default:
            };
        });
    });
}

function pressEquals(){
    const equalsButton = document.querySelector('.equals');
    
    equalsButton.addEventListener('click', () => {
        if ((operation == '') || ((operation) && (displayValue == ''))){
            return;
        } else {
            num2 = Number(displayValue);
            displayValue = '';
            
            if ((operation == divide) && (num2 == 0)) {
                display.textContent = 'ILLEGAL MOVE';
            } else {
                let result = operate(operation, num1, num2);
                result = result.toString();

                if (result.length > 34){
                    result = result.slice(0, 34);
                    result = Math.round(result * 10**31) / 10**31;
                };
                display.textContent = result;
                operation = '';
            };
        };
    });
}

clearButton.addEventListener('click', () => {
    displayValue = '';
    operation = '';
    display.textContent = '';
    display.style.borderColor = 'lightgrey';
});

function calculate(){
    inputNumbers();
    inputAction();
    pressEquals();
}

calculate();