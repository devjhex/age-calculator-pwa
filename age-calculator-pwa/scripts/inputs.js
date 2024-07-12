import * as translate from './translate.js';

const allInputs = document.querySelectorAll('input');
const allInputsArray = Array.from(allInputs);
const calculateButton = document.querySelector('button');
const tabbableElements = allInputsArray.concat([calculateButton]);
const inputGroupParent = document.getElementById('input-group-container');
const output = document.getElementById('resultsOutput');
const calculatorApp = document.getElementById('calculator-application');

calculatorApp.addEventListener('keydown', (event)=>{
    if (event.key === "Tab") {
        trapFocus(event, inputGroupParent, output);
    }
})

inputGroupParent.addEventListener('keydown', (event)=>{
    let target = event.target;
    if(target === inputGroupParent && event.key === "Enter"){
        event.preventDefault();
        allInputs[0].focus();   

        /* change the tabindex to 0 */
        tabbableFunctionality(tabbableElements, "add");
    }else if (target === calculateButton && event.key === "Enter"){
        tabbableFunctionality(tabbableElements, "remove");
    }else if(target === inputGroupParent && event.key === "Escape"){
        calculatorApp.focus();
    }
});

output.addEventListener('keydown', (event)=>{
    if(event.key === "Escape"){
        calculatorApp.focus();
    }
})

tabbableElements.forEach(element =>{
    element.addEventListener('keydown', (event)=>{
        if(event.key === "Escape"){
            inputGroupParent.focus();
            tabbableFunctionality(tabbableElements, "remove");
        }else if (event.key === "ArrowRight"){
            let nextItem = tabbableElements[tabbableElements.indexOf(element) + 1] || tabbableElements[0];
            nextItem.focus();
        }else if (event.key === "ArrowLeft"){
            let prevItem = tabbableElements[tabbableElements.indexOf(element) - 1] || tabbableElements[tabbableElements.length - 1];
            prevItem.focus();
        }
        trapFocus(event, allInputs[0], calculateButton);
    });
});

function validateInputOnClick(input){
    if(!isNaN(input.value)){
        //check if the number is a valid number for the specific calculation then return some input or message.
        if((input.value <= 0 || input.value > 31) && input.id === "dayInput"){
                input.classList.add('error');
                generateErrorMessage(input, "dayError");
           
        }else if( (input.value < 0 || input.value > 12) && input.id === "monthInput"){
                input.classList.add('error');
                generateErrorMessage(input, "monthError");
            
        }else if((input.value > new Date().getFullYear()) && (input.id === 'yearInput')){
                input.classList.add('error');
                generateErrorMessage(input, "yearError");
        }
        else {
            if (input.classList.contains('error')) {
                removeErrorMessage(input);
                input.classList.remove('error');
            }else {
                return;
            }
        }
        
    }else if(isNaN(input.value)){
        //generateErrorMessage on the input field where the error just occurred.
        input.classList.add('error');

        generateErrorMessage(input, 'inputError');
    }else {
        if (input.classList.contains('error')) {
            removeErrorMessage(input);
            input.classList.remove('error');
        }else {
            return;
        }
    }
}

function getUserInput(){
    /* first make sure that all the elements have an input and that the input is valid */
    let inputsHaveValues = allInputsArray.map(input=>{
        return input.value.length > 0; 
    }).every(bool=>{
        return bool === true;
    })
    let inputsHaveValidInput = allInputsArray.map(input=>{
        return input.classList.contains('error') === false;
    }).every(bool=>{
        return bool === true;
    });

    if(inputsHaveValues && inputsHaveValidInput) {
        let userInput = allInputsArray.map(input=>{
            if((input.value < 10)){
                let zero = "0";
                if(input.id === "monthInput"){
                    return zero + (input.value - 1);
                }else {
                    return zero + input.value;
                }
            }else {
                return input.value;
            }
        }).reverse();

        let isValidDate = dateValid(parseInt(userInput[0]), parseInt(userInput[1]), parseInt(userInput[2]));
        
        if (isValidDate) {
            return {year:userInput[0], month:userInput[1], day:userInput[2]};
        }else{
            allInputs[0].classList.add('error');
            generateErrorMessage(allInputs[0], "Must be a valid day");
            return 'Invalid Date';
        }
    }else if(inputsHaveValues === false){
        allInputsArray.forEach(item=>{
            if(item.value == false){
                item.classList.add('error');
                generateErrorMessage(item, "emptyInputError");
            }
        })
    }else {
        return;
    }
}

function dateValid(year, month, day){
    let dateInput = new Date(year, month, day);
    let standardDate = new Date(year, month + 1, 0);

    if(dateInput.getMonth() === standardDate.getMonth()){   
        return true;
    }else {
        return false;
    }

}

function calculateAge(formattedDate){
    let birthDate;
    let today;
    let age;
    if (formattedDate) {
        birthDate = new Date(formattedDate.year, formattedDate.month, formattedDate.day);
        today = new Date();

        if(getAge(today, birthDate) === "Invalid Input"){
            return "Invalid Input, the age cannot be calculated."
        }else {
            age = getAge(today, birthDate);
        }


    }else if(!formattedDate){
        return;
    }
    return age;
}

function getAge(today, birthDate){
    let years = today.getFullYear() - birthDate.getFullYear();

    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if(days < 0){
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        days += lastMonth.getDate();
    }

    if(months < 0){
        years --;
        months += 12;
    }

    if(isNaN(years) || isNaN(months) || isNaN(days) ){
        return "Invalid Input";
    }else {
        return {years, months, days};
    }   
};

/* Error Functions */
function generateErrorMessage(input, message){
    //get the parent div of the input and remove the old text, apply the text and then add the error styles.
    let parentOfInput = input.closest('div');
    let inputLabel = parentOfInput.querySelector('label');
    let errorMessageElement = parentOfInput.querySelector('.errorMessage');
    switch (message) {
        case "dayError":
            message = translate.currentTranslation.errorMessages.dayError;
            break;
        case "monthError":
            message = translate.currentTranslation.errorMessages.monthError;
            break;
        case "yearError":
            message = translate.currentTranslation.errorMessages.yearError;
            break;
        case "inputError":
            message = translate.currentTranslation.errorMessages.inputError;
            break;
        case "emptyInputError":
            message = translate.currentTranslation.errorMessages.emptyInputError;
            break;
    }

    /* show the message associated with the error that has occurred. */
    input.setAttribute('aria-invalid', true);
    errorMessageElement.textContent = message;
    errorMessageElement.classList.remove('hidden');
    

     
    /* Add indicator to the label and input */
    addColorIndicator(input, inputLabel)

}

function removeErrorMessage(input){
    let parentOfInput = input.closest('div');
    let inputLabel = parentOfInput.querySelector('label');
    let errorMessageElement = parentOfInput.querySelector('.errorMessage');

    /* show the message associated with the error that has occurred. */
    input.removeAttribute('aria-invalid');
    errorMessageElement.textContent = "";
    errorMessageElement.classList.add('hidden');
    inputLabel.classList.remove('text-priLightRed');
     
    /* Add indicator to the label and input */
    removeColorIndicator(input);
}

function addColorIndicator(input, label){
    label.classList.add('text-priLightRed');
    input.classList.remove('focus:outline-priPurple');
    input.classList.add('focus:outline-priLightRed');
    input.classList.add('outline');
    input.classList.add('outline-priLightRed');

}

function removeColorIndicator(input){
    input.classList.remove('focus:outline-priLightRed');
    input.classList.add('focus:outline-priPurple');
    input.classList.remove('outline');
    
}

function trapFocus(event, firstFocusableElement, lastFocusableElement){
    if(event.key === 'Tab' &&  !event.shiftKey){
        //if the user presses the tab key without the shift key and the last focusable element is focused focus the first element.

        if(document.activeElement === lastFocusableElement) {
            event.preventDefault();

            firstFocusableElement.focus();
        }
    } else if(event.key === 'Tab' && event.shiftKey){
        //if the user presses the tab key with the shift key and the first focusable element is focused focus the last focusable element.
        if(document.activeElement === firstFocusableElement) {
            event.preventDefault();

            lastFocusableElement.focus();
        }
    }
}

function tabbableFunctionality(elements, action){
    if(action === "add"){
        elements.forEach(element=>{
            element.setAttribute('tabindex', 0);
        })
    }
    else if (action === "remove"){
        elements.forEach(element=>{
            element.setAttribute('tabindex', -1);
        })
    }
    
}

export default {calculateAge, calculateButton, output,tabbableElements, getUserInput, validateInputOnClick, allInputsArray, tabbableFunctionality};