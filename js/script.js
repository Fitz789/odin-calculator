let display = document.getElementById("display");
let myArray = [];
let operator, total, roundedTotal, solution;
let errorMessage = "ERROR";

let nums = document.querySelectorAll(".num");                                               //when 'num' buttons clicked, add the num values to the display
nums.forEach((num) => {
    num.addEventListener('click', () => {
        myArray.push(num.id);
        display.textContent = myArray.join("");
    });
});

let ops = document.querySelectorAll(".ops");
ops.forEach((op) => {
    op.addEventListener('click', () => {                                                    //when any operator button is clicked (+-*/)
        if (typeof firstInput !== "undefined" && typeof solution !== "undefined") {         //if firstInput is already defined, and = has been used to calculate solution
            firstInput = solution;                                                          //store that solution as firstInput
        } else if (typeof firstInput !== "undefined") {                                     //else, if firstInput has been defined, but = has not been used to calculate solution
            secondInput = myArray.reduce((firstValue, currentValue) => {                    //define what's in the array as secondInput
            return `${firstValue}` + `${currentValue}`;
            });
            myArray = [];                                                                   //clear space for new input
            operate();                                                                      //calculate & return solution
            firstInput = roundedTotal;                                                             //store solution as value for continuing equation without = being clicked
        } else {
            firstInput = myArray.reduce((firstValue, currentValue) => {                     //if there is no firstInput, create firstInput
                return `${firstValue}` + `${currentValue}`;
                });
        }
        operator = op.id;                                                                   //define operator
        display.textContent = firstInput + operator;                                        //display firstInput and operator
        myArray = [];                                                                       //clear space for new input
    });
});

let equals = document.getElementById("=");
equals.addEventListener('click', () => {                                                //when = button is clicked
    if (firstInput == undefined) {
        display.textContent = errorMessage;
    } else {
    secondInput = myArray.reduce((firstValue, currentValue) => {                        //store values in array as secondInput
        return `${firstValue}` + `${currentValue}`;
        });
    operate();                                                                           //calculate & return solution
    solution = roundedTotal;                                                                   //store solution as value for continuing equation
}});

let clear = document.getElementById("clear");
clear.addEventListener('click', () => {                                                 //when clear button is clicked
    myArray = [];                                                                       //clear space for new input
    firstInput = undefined;                                                                    //reset firstInput
    solution = undefined;
    display.textContent = myArray;              
});

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
}

function operate() {                                                                    //choose correct formula based on operator
    if (operator == "+") {
        add(firstInput, secondInput);
    } else if (operator == "-") {
        subtract(firstInput, secondInput)
    } else if (operator == "*") {
        multiply(firstInput, secondInput)
    } else if (operator == "/") {
        divide(firstInput, secondInput)
    };
    if (total == Infinity) {
        display.textContent = errorMessage;
    } else {
    roundedTotal = round(total, 9);
    display.textContent = roundedTotal;
    return roundedTotal;
    }
};

function add (a, b) {
    total = +a + +b;
    return total;
};
        
function subtract (a, b) {
    total = +a - +b;
    return total;
};
        
function multiply (a, b) {
    total = +a * +b;
    return total;
};
        
function divide (a, b) {
    total = +a/+b;
    return total;
};
