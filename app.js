// We use a class to store our information within our output
class Calculator {
    /* Our constructor take the previous and the current
    because we need to know where to place our display text
    for our calculate. */
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    /* We need to create some functions for the operations
    our class can conform(meaning addition, subration, etc.) */
    
    // For clearing out all our variables
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // For deleting a single number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /* Which essentially is what will happen
    everytime a user clicks on a number to add to
    the screen (ouput)
    It has a parameter because it is being
    passed the number the user clicked on */
    appendNumber(number) {
        /* Since we only ever want on decimal in our
        currentOperand we must check if our currentOperand has
        a decimal, and then by returning it halts from adding
        more decimals */
        /* Why does the return do this though? answer: It's saying
        if we type the period key, but our currentOperand
        already has it then it returns without adding. */
        if (number === '.' && this.currentOperand.includes('.')) return
        /* We set this.currentOperand = to strings + string so that our
        javascript rather than adding the two numbers together, appends them as a string*/
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    /* This is for when the user clicks on any
    of the operations (+ - * etc) 
    It has a parameter because it needs to take the
    operation the user selected */
    chooseOperation(operation) {
        /* This if statement will not log in any new
        operation if the string is empty, thus keeping
        the previousOperand in the output, and not changing
        it to an empty string */
        if (this.currentOperand === '') return
        /* This if statement will take the previousOperand
        running the compute function with the currentOperand */
        if(this.previousOperand !== '') {
            this.compute()
        }
        /* first we set the operation equal to the
        operation we passed in that way our calculator
        knows what operation it needs to use when
        it computes the value */
        this.operation = operation
        /* We want to set the currentOperand to
        the previous, so we are saying we are done 
        with this number and recycle it to the previous */
        this.previousOperand = this.currentOperand
        /* Now we are clearing out the currentOperands
        value */
        this.currentOperand = ''
    }

    /* This will take the values in our calculator,
    and compute a single value for what we need
    to display in our output */
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    /* This will allow us to update our display,
    and will update the values in our output */
    updateDisplay() {
        /* This will allow us to set the innerText into
        our output */
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {

        /* This displays our previousOperand in our 
        previousOperandTextElement area in HTML */
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}
/* Using data-attributes makes it easier to see
what parts we are using for our Javascript and
what parts we are using for our CSS. */
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

/* To hook up all our variables to start making them
work on our calculator we start by creating a calculator
and then pass everything from our constructor into it 
In this case we pass the two elements previousOperand &
currentOperand*/
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/* Now that we've passed our contructor elements to
our new calculator objecy we can use it, but to use it
we first select our number buttons */

// We say forEach to loop over all number Buttons
numberButtons.forEach(button => {
    /* For each button we add an eventListener
    so that when we click on one of our buttons it does
    something (hence the empty parathesis) */
    button.addEventListener('click', () => {
        /* In our case we want take our
        calculator and add the number to
        whatever is in that button (button.innerText) */
        calculator.appendNumber(button.innerText)
        /* Once the number is appended we need
        to call the calculator.updateDisplay (this
        way everytime we click on a button  our 
        display values in the output will be 
        continuously updated*/
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        /* We pass the text of our operation into
        our output to be displayed */
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})