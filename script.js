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
let mathArray = [];

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

function inputAction(){
    const actionButtons = document.querySelectorAll('.action');

    actionButtons.forEach((button) => {
        button.addEventListener('click', () => {
            operation = button.getAttribute('id');
            
            if (operation != "AC"){
                let num = Number(displayValue);
                displayValue = '';
                mathArray.push(num);
                mathArray.push(operation);
            };
        });
    });
}

function reduceArray(index){
    determineOperator(mathArray[index]);
    let result = operate(operation, mathArray[index-1], mathArray[index+1]);
    mathArray.splice(index-1, 3, result);
}

function evaluateEquals(){
    const equalsButton = document.querySelector('.equals');
    
    equalsButton.addEventListener('click', () => {
        if ((operation == '') || ((operation) && (displayValue == ''))){
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
        };
    });
}

clearButton.addEventListener('click', () => {
    displayValue = '';
    operation = '';
    mathArray = [];
    display.textContent = '';
    display.style.borderColor = 'lightgrey';
});

function calculate(){
    inputNumbers();
    inputAction();
    evaluateEquals();
}

calculate();