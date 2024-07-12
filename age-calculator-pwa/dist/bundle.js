(()=>{"use strict";let e,t="en";const r=document.querySelector("select");window.addEventListener("DOMContentLoaded",(t=>{fetch("./scripts/en.json").then((e=>e.json())).then((t=>{e=t})).catch((e=>{console.error("Error fetching language file:",e)}))})),r.addEventListener("change",(r=>{t=r.target.value,console.log(t),fetch(`./scripts/${t}.json`).then((e=>e.json())).then((r=>{var n;console.log(r),e=r,n=r,document.documentElement.lang=t,document.querySelector(".appTitle").textContent=n.appTitle,document.querySelector(".inputGroupAriaLabel").setAttribute("aria-label",n.inputGroupAriaLabel),document.querySelector(".dayLabel").textContent=n.dayInput.label,document.querySelector("#dayInput").setAttribute("aria-label",n.dayInput.ariaLabel),document.querySelector(".dayInstruction").textContent=n.dayInput.instruction,document.querySelector(".monthLabel").textContent=n.monthInput.label,document.querySelector("#monthInput").setAttribute("aria-label",n.monthInput.ariaLabel),document.querySelector(".monthInstruction").textContent=n.monthInput.instruction,document.querySelector(".yearLabel").textContent=n.yearInput.label,document.querySelector("#yearInput").setAttribute("aria-label",n.yearInput.ariaLabel),document.querySelector(".yearInstruction").textContent=n.yearInput.instruction,document.querySelector(".bigYears").textContent=n.resultsDisplay.bigYears,document.querySelector(".bigMonths").textContent=n.resultsDisplay.bigMonths,document.querySelector(".bigDays").textContent=n.resultsDisplay.bigDays,document.querySelector("button").setAttribute("aria-label",n.button.ariaLabel),document.querySelector(".buttonInstruction").textContent=n.button.instruction,document.querySelector("img").setAttribute("alt",n.image.alt),document.querySelector(".dayErrorMessage").textContent=n.errorMessages.dayError,document.querySelector(".monthErrorMessage").textContent=n.errorMessages.monthError,document.querySelector(".yearErrorMessage").textContent=n.errorMessages.yearError})).catch((e=>{console.error("Error fetching language file:",e)}))}));const n=document.querySelectorAll("input"),a=Array.from(n),o=document.querySelector("button"),s=a.concat([o]),i=document.getElementById("input-group-container"),l=document.getElementById("resultsOutput"),u=document.getElementById("calculator-application");function c(e,t){let r=e.getFullYear()-t.getFullYear(),n=e.getMonth()-t.getMonth(),a=e.getDate()-t.getDate();if(a<0){n--;a+=new Date(e.getFullYear(),e.getMonth(),0).getDate()}return n<0&&(r--,n+=12),isNaN(r)||isNaN(n)||isNaN(a)?"Invalid Input":{years:r,months:n,days:a}}function d(t,r){let n=t.closest("div"),a=n.querySelector("label"),o=n.querySelector(".errorMessage");switch(r){case"dayError":r=e.errorMessages.dayError;break;case"monthError":r=e.errorMessages.monthError;break;case"yearError":r=e.errorMessages.yearError;break;case"inputError":r=e.errorMessages.inputError;break;case"emptyInputError":r=e.errorMessages.emptyInputError}t.setAttribute("aria-invalid",!0),o.textContent=r,o.classList.remove("hidden"),function(e,t){t.classList.add("text-priLightRed"),e.classList.remove("focus:outline-priPurple"),e.classList.add("focus:outline-priLightRed"),e.classList.add("outline"),e.classList.add("outline-priLightRed")}(t,a)}function y(e){let t=e.closest("div"),r=t.querySelector("label"),n=t.querySelector(".errorMessage");e.removeAttribute("aria-invalid"),n.textContent="",n.classList.add("hidden"),r.classList.remove("text-priLightRed"),function(e){e.classList.remove("focus:outline-priLightRed"),e.classList.add("focus:outline-priPurple"),e.classList.remove("outline")}(e)}function m(e,t,r){"Tab"!==e.key||e.shiftKey?"Tab"===e.key&&e.shiftKey&&document.activeElement===t&&(e.preventDefault(),r.focus()):document.activeElement===r&&(e.preventDefault(),t.focus())}function p(e,t){"add"===t?e.forEach((e=>{e.setAttribute("tabindex",0)})):"remove"===t&&e.forEach((e=>{e.setAttribute("tabindex",-1)}))}u.addEventListener("keydown",(e=>{"Tab"===e.key&&m(e,i,l)})),i.addEventListener("keydown",(e=>{let t=e.target;t===i&&"Enter"===e.key?(e.preventDefault(),n[0].focus(),p(s,"add")):t===o&&"Enter"===e.key?p(s,"remove"):t===i&&"Escape"===e.key&&u.focus()})),l.addEventListener("keydown",(e=>{"Escape"===e.key&&u.focus()})),s.forEach((e=>{e.addEventListener("keydown",(t=>{if("Escape"===t.key)i.focus(),p(s,"remove");else if("ArrowRight"===t.key){(s[s.indexOf(e)+1]||s[0]).focus()}else if("ArrowLeft"===t.key){(s[s.indexOf(e)-1]||s[s.length-1]).focus()}m(t,n[0],o)}))}));const g={calculateAge:function(e){let t,r,n;if(e){if(t=new Date(e.year,e.month,e.day),r=new Date,"Invalid Input"===c(r,t))return"Invalid Input, the age cannot be calculated.";n=c(r,t)}else if(!e)return;return n},calculateButton:o,output:l,tabbableElements:s,getUserInput:function(){let e=a.map((e=>e.value.length>0)).every((e=>!0===e)),t=a.map((e=>!1===e.classList.contains("error"))).every((e=>!0===e));if(e&&t){let e=a.map((e=>{if(e.value<10){let t="0";return"monthInput"===e.id?t+(e.value-1):t+e.value}return e.value})).reverse();return function(e,t,r){let n=new Date(e,t,r),a=new Date(e,t+1,0);return n.getMonth()===a.getMonth()}(parseInt(e[0]),parseInt(e[1]),parseInt(e[2]))?{year:e[0],month:e[1],day:e[2]}:(n[0].classList.add("error"),d(n[0],"Must be a valid day"),"Invalid Date")}!1===e&&a.forEach((e=>{0==e.value&&(e.classList.add("error"),d(e,"emptyInputError"))}))},validateInputOnClick:function(e){if(isNaN(e.value))if(isNaN(e.value))e.classList.add("error"),d(e,"inputError");else{if(!e.classList.contains("error"))return;y(e),e.classList.remove("error")}else if((e.value<=0||e.value>31)&&"dayInput"===e.id)e.classList.add("error"),d(e,"dayError");else if((e.value<0||e.value>12)&&"monthInput"===e.id)e.classList.add("error"),d(e,"monthError");else if(e.value>(new Date).getFullYear()&&"yearInput"===e.id)e.classList.add("error"),d(e,"yearError");else{if(!e.classList.contains("error"))return;y(e),e.classList.remove("error")}},allInputsArray:a,tabbableFunctionality:p};const f={animateAgeRolling:function(e,t){const r=document.getElementById(t);r.innerHTML="";const n=String(e).split("");n.forEach((e=>{const a=document.createElement("div");a.classList.add("digitContainer");for(let o=0;o<=e;o++){const e=document.createElement("div");e.classList.add("digit"),e.textContent=o,e.style.transform=`translateY(-{${100*o}%})`,a.appendChild(e),r.appendChild(a);document.querySelectorAll(`#${t} .digitContainer`).forEach(((e,t)=>{const r=100*-n[t];setTimeout((()=>{e.style.transform=`translateY(${r}%)`}),100*t)}))}}))}};function v(t){t.preventDefault();let r=g.calculateAge(g.getUserInput());if("object"==typeof r){let t=document.getElementById("result-container"),n=e.words,a=`${r.years} ${n.years}${r.years>1||r.years,"s"}, ${r.months} ${n.months}${r.months>1||0===r.months?"s":""} ${n.and} ${r.days} ${n.days}${r.days>1||0===r.days?"s":""}.`;t.textContent=a,f.animateAgeRolling(r.years,"yearsContainer"),f.animateAgeRolling(r.months,"monthsContainer"),f.animateAgeRolling(r.days,"daysContainer")}}window.addEventListener("load",(()=>{"serviceWorker"in navigator&&navigator.serviceWorker.register("./service-worker.js").then((e=>{console.log("Service Worker registered : ",e)})).catch((e=>{console.error("Service Worker registration failed: ",e)}))})),window.addEventListener("DOMContentLoaded",(()=>{g.allInputsArray.forEach((e=>{e.addEventListener("input",(e=>{g.validateInputOnClick(e.target)}))})),g.calculateButton.addEventListener("click",v),g.calculateButton.addEventListener("keydown",(e=>{e.preventDefault(),"Enter"===e.key&&v(e)}))}))})();
//# sourceMappingURL=bundle.js.map