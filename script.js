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
const decimal = document.querySelector('[data-info="decimal"]');
let displayValue = '';
let operation = '';
let mathArray = [];

function pressButtons(){
    window.addEventListener('keydown', function(e){
        if (e.keyCode == 8){
            undoNumber();
        } else if (e.keyCode == 13){
            evaluateEquals();
        } else if ((e.keyCode == 110) || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
            let idValue = (e.keyCode <= 57) ? (e.keyCode - 48) : (e.keyCode - 96);
            let button = document.querySelector(`[id="${idValue}"]`);
            if (e.keyCode == 110){
                button = decimal;
                let decimalSearch = displayValue.search(/[.]/g);
                if (decimalSearch != -1){
                    return;
                };
            };
            inputNumbers(button);
        } else if (e.keyCode >= 106 && e.keyCode != 110){
            let idValue;
            switch (e.keyCode){
                case 106:
                    idValue = '*';
                    break;
                case 107:
                    idValue = '+';
                    break;
                case 109:
                    idValue = '-';
                    break;
                case 111:
                    idValue = '/';
                    break;
                default:
            };
            let button = document.querySelector(`[id="${idValue}"]`);
            inputAction(button);
        };
    });
}
  
function clickButtons(){
    const backspace = document.querySelector('#backspace');
    backspace.addEventListener('click', undoNumber);

    const equalsButton = document.querySelector('.equals');
    equalsButton.addEventListener('click', evaluateEquals);

    const numberButtons = document.querySelectorAll('.number');
    numberButtons.forEach((button) => {
        button.addEventListener('click', () => {inputNumbers(button)});
    });

    const actionButtons = document.querySelectorAll('.action');
    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {inputAction(button)});
    });
}
  
function undoNumber(){
    let lastNum = displayValue.length - 1;  
    displayValue = displayValue.slice(0, lastNum);
    display.textContent = displayValue;
    
    let decimalSearch = displayValue.search(/[.]/g);
    if (decimalSearch == -1){
        decimal.disabled = false;
    };
}
  
function inputNumbers(input){
    let number = input.getAttribute('id');

    if (displayValue.length < 34){
        displayValue += number;
        if (input == decimal){
            decimal.disabled = true;
        };
    };
    display.textContent = displayValue;
    display.style.borderColor = '#4285f4';      
}

function inputAction(input){
    operation = input.getAttribute('id');

    if ((operation != "AC") && (operation != "backspace")){
        let num = Number(displayValue);
        displayValue = '';
        mathArray.push(num);
        mathArray.push(operation);
        decimal.disabled = false;
    };
}
  
function determineOperator(action){
    switch (action){
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
}
  
function reduceArray(index){
    determineOperator(mathArray[index]);  
    let result = operate(operation, mathArray[index-1], mathArray[index+1]);
    mathArray.splice(index-1, 3, result);
}
  
function evaluateEquals(){
    if ((operation === '') || ((operation) && (displayValue == ''))){
        return;
    } else {
        let num = Number(displayValue);
        displayValue = '';
        mathArray.push(num);
  
        for (let i=0; i<mathArray.length; i++){
            if ((mathArray[i] == "/") && (mathArray[i+1] ==  0)) {
                display.textContent = 'ILLEGAL MOVE';
                operation = '';  
                mathArray = [];
                decimal.disabled = false;
                return;
            } else if ((mathArray[i] == "/") || (mathArray[i] == "*")){
                reduceArray(i);
                i = --i;
            };    
        };
  
        for (let i=0; i<mathArray.length; i++){
            if ((mathArray[i] == "+") || (mathArray[i] == "-")){
                reduceArray(i);
                i = --i;
            };    
        };
    
        let result = mathArray;
        result = result.toString();
    
        if (result.length > 33){
            result = result.slice(0, 33);
            result = Math.round(result * 10**30) / 10**30;
        };
        
        display.textContent = result;
        operation = '';  
        mathArray = [];
        decimal.disabled = false;
    };
}
  
clearButton.addEventListener('click', () => {
    displayValue = '';
    operation = '';
    mathArray = [];
    display.textContent = '';
    display.style.borderColor = 'lightgrey';
    decimal.disabled = false;
});
  
function calculate(){
    pressButtons();
    clickButtons();
}
  
calculate();