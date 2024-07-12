import * as inputs from './inputs.js';
import * as results from './displayResults.js';
import * as translate from './translate.js';
import { registerServiceWorker } from './app.js';

window.addEventListener('load', ()=>{
    //load the service worker
    registerServiceWorker();
});

window.addEventListener('DOMContentLoaded', ()=>{
    inputs.default.allInputsArray.forEach(input=>{
        input.addEventListener('input', (event)=>{
            inputs.default.validateInputOnClick(event.target);
        });
    });
    
    inputs.default.calculateButton.addEventListener('click',renderResults);

    inputs.default.calculateButton.addEventListener('keydown',(event)=>{
        event.preventDefault();
        if(event.key === "Enter"){
            renderResults(event);
        }
        
    });
});

function renderResults(event){
        event.preventDefault();
        let calculatedAge = inputs.default.calculateAge(inputs.default.getUserInput());
        if(typeof calculatedAge === 'object'){
            /* Tell the screen readers about the current results */
            let resultsElement = document.getElementById('result-container');
            let smallDictionary = translate.currentTranslation.words;
            
            let ageText = `${calculatedAge.years} ${smallDictionary.years}${calculatedAge.years > 1 || calculatedAge.years === 0 ? "s" : "s"}, ${calculatedAge.months} ${smallDictionary.months}${calculatedAge.months > 1 || calculatedAge.months === 0 ? "s" : ""} ${smallDictionary.and} ${calculatedAge.days} ${smallDictionary.days}${calculatedAge.days > 1 || calculatedAge.days === 0 ? "s" : ""}.`;

            resultsElement.textContent = ageText;

            results.default.animateAgeRolling(calculatedAge.years, 'yearsContainer');
            results.default.animateAgeRolling(calculatedAge.months, 'monthsContainer');
            results.default.animateAgeRolling(calculatedAge.days, 'daysContainer');
        }else {
            return;
        }
}