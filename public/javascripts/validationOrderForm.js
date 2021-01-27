function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function validateForm() {
    const clientInput = document.getElementById('client');
    const itemInput = document.getElementById('item');
    const dateInput = document.getElementById('date');
    const shippingDateInput = document.getElementById('shiping-date');
    const shippingAddressInput = document.getElementById('shipping-address');

    const errorClient = document.getElementById('errorClient');
    const errorItem = document.getElementById('errorItem');
    const errorDate = document.getElementById('errorDate');
    const errorShippingDate = document.getElementById('errorShippingDate');
    const errorShippingAddress = document.getElementById('errorShippingAddress');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([clientInput, itemInput, dateInput, shippingDateInput, shippingAddressInput],
        [errorClient, errorItem, errorDate, errorShippingDate, errorShippingAddress], errorsSummary);

    let valid = true;

    if (!checkRequired(clientInput.value)) {
        valid = false;
        clientInput.classList.add("error-input");
        errorClient.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(itemInput.value)) {
        valid = false;
        itemInput.classList.add("error-input");
        errorItem.innerText = "Pole jest wymagane";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Data nie może być z przyszłości";
    }

    if (!checkRequired(shippingDateInput.value)) {
        valid = false;
        shippingDateInput.classList.add("error-input");
        errorShippingDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(shippingDateInput.value)) {
        valid = false;
        shippingDateInput.classList.add("error-input");
        errorShippingDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateInput.value, shippingDateInput.value)) {
        valid = false;
        shippingDateInput.classList.add("error-input");
        errorShippingDate.innerText = "Data nie może być z przeszłości";
    }

    if (!checkRequired(shippingAddressInput.value)) {
        valid = false;
        shippingAddressInput.classList.add("error-input");
        errorShippingAddress.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(shippingAddressInput.value, 1, 60)) {
        valid = false;
        shippingAddressInput.classList.add("error-input");
        errorShippingAddress.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;
}