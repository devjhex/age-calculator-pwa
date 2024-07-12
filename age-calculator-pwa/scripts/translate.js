let currentLanguage = "en";
let currentTranslation;
const selectMenu = document.querySelector('select');

window.addEventListener('DOMContentLoaded', (event)=>{
    //To have an initial translation for the rest of the JavaScript.
    fetch(`./scripts/en.json`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        currentTranslation = data;
    }).catch(error=>{
        console.error("Error fetching language file:", error);
    });
});

selectMenu.addEventListener('change', (event)=>{
    currentLanguage = event.target.value;
    console.log(currentLanguage);
    fetch(`./scripts/${currentLanguage}.json`)
    .then(response=>{
        return response.json();
    }).then(data=>{
        //we should update the language content with a function that should be created.
        console.log(data);
        currentTranslation = data;
        updateLanguageContent(data);
    }).catch(error=>{
        console.error("Error fetching language file:", error);
    });
});

function updateLanguageContent(translations){
    //The html lang attribute
    document.documentElement.lang = currentLanguage;

    //Change the meta descriptions as well but skip for now.

    //Change the text in the elements.
    document.querySelector('.appTitle').textContent = translations.appTitle;

    document.querySelector('.inputGroupAriaLabel').setAttribute('aria-label', translations.inputGroupAriaLabel);

    document.querySelector('.dayLabel').textContent = translations.dayInput.label;
    document.querySelector('#dayInput').setAttribute('aria-label', translations.dayInput.ariaLabel);
    document.querySelector(".dayInstruction").textContent = translations.dayInput.instruction;

    document.querySelector('.monthLabel').textContent = translations.monthInput.label;
    document.querySelector('#monthInput').setAttribute('aria-label', translations.monthInput.ariaLabel);
    document.querySelector(".monthInstruction").textContent = translations.monthInput.instruction;

    document.querySelector('.yearLabel').textContent = translations.yearInput.label;
    document.querySelector('#yearInput').setAttribute('aria-label', translations.yearInput.ariaLabel);
    document.querySelector(".yearInstruction").textContent = translations.yearInput.instruction;

    document.querySelector(".bigYears").textContent = translations.resultsDisplay.bigYears;
    document.querySelector(".bigMonths").textContent = translations.resultsDisplay.bigMonths;
    document.querySelector(".bigDays").textContent = translations.resultsDisplay.bigDays;

    document.querySelector('button').setAttribute('aria-label', translations.button.ariaLabel);
    document.querySelector('.buttonInstruction').textContent = translations.button.instruction;

    document.querySelector('img').setAttribute('alt', translations.image.alt);

    document.querySelector('.dayErrorMessage').textContent = translations.errorMessages.dayError;
    document.querySelector('.monthErrorMessage').textContent = translations.errorMessages.monthError;
    document.querySelector('.yearErrorMessage').textContent = translations.errorMessages.yearError;
}

export { currentLanguage, currentTranslation };