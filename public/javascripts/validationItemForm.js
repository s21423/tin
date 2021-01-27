function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function validateForm() {
    const nameInput = document.getElementById('name');
    const typeInput = document.getElementById('type');
    const priceInput = document.getElementById('price');

    const errorName = document.getElementById('errorName');
    const errorType = document.getElementById('errorType');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput, typeInput, priceInput], [errorName, errorType, errorPrice], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(typeInput.value)) {
        valid = false;
        typeInput.classList.add("error-input");
        errorType.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(typeInput.value, 2, 60)) {
        valid = false;
        typeInput.classList.add("error-input");
        errorType.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(priceInput.value, 1, 60)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno zawierać od 1 do 60 znaków";
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}