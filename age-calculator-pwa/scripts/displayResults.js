
function animateAgeRolling(value, containerId){
    const container = document.getElementById(containerId);

    //Clear the previous content;
    container.innerHTML = "";

    const digits = String(value).split('');

    digits.forEach(digit=>{
        const digitContainer = document.createElement("div");

        digitContainer.classList.add('digitContainer');

        for (let i = 0; i <= digit ; i++) {
        const digitElement = document.createElement('div');

        digitElement.classList.add('digit');

        digitElement.textContent = i;

        digitElement.style.transform = `translateY(-{${i * 100}%})`;

        digitContainer.appendChild(digitElement);
        
        container.appendChild(digitContainer);
        // console.log(containerId);
        //Animate the digits
        const digitContainers = document.querySelectorAll(`#${containerId} .digitContainer`);

        digitContainers.forEach((container , index)=>{
            // console.log(container);
            const digit = digits[index];
            // console.log('an itertation', digit);
            const finalPosition = -digit * 100;

            setTimeout(()=>{
             container.style.transform = `translateY(${finalPosition}%)`;
            }, index * 100);
        })
        }
    });


}

export default { animateAgeRolling };