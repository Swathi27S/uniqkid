const form = document.getElementById("form");
const landmark = document.getElementById("landmark");
const street = document.getElementById("street");
const village = document.getElementById("village");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const phonenumber = document.getElementById("phonenumber");
const zipcode = document.getElementById("zipcode");

form.addEventListener("submit", e => {
    if (!validateInputs()) {
        form.submit();
    } else {
        e.preventDefault();
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".forValidation");
    errorDisplay.innerText = message;
};

const validateInputs = () => {
    const letterOnlyRegex = /^[A-Za-z\s]*$/;
    const phoneNumberRegex = /^[0-9]{10}$/;
    const zipCodeRegex = /^[0-9]{5}$/;
    let hasError = false;

    const landmarkValue = landmark.value.trim();
    const streetValue = street.value.trim();
    const villageValue = village.value.trim();
    const cityValue = city.value.trim();
    const stateValue = state.value.trim();
    const countryValue = country.value.trim();
    const phoneNumberValue = phonenumber.value.trim();
    const zipCodeValue = zipcode.value.trim();

    if (landmarkValue === '') {
        setError(landmark, "Field is required");
        hasError = true;
    } else {
        setError(landmark, "");
    }

    if (streetValue === '') {
        setError(street, "Field is required");
        hasError = true;
    } else {
        setError(street, "");
    }

    if (villageValue === '') {
        setError(village, "Field is required");
        hasError = true;
    } else {
        setError(village, "");
    }

    if (cityValue === '') {
        setError(city, "Field is required");
        hasError = true;
    } else {
        setError(city, "");
    }

    if (stateValue === '') {
        setError(state, "Field is required");
        hasError = true;
    } else {
        setError(state, "");
    }

    if (countryValue === '') {
        setError(country, "Field is required");
        hasError = true;
    } else {
        setError(country, "");
    }

    if (phoneNumberValue === '') {
        setError(phonenumber, "Field is required");
        hasError = true;
    } else if (!phoneNumberRegex.test(phoneNumberValue)) {
        setError(phonenumber, "Invalid phone number");
        hasError = true;
    } else {
        setError(phonenumber, "");
    }

    if (zipCodeValue === '') {
        setError(zipcode, "Field is required");
        hasError = true;
    } else if (!zipCodeRegex.test(zipCodeValue)) {
        setError(zipcode, "Invalid zip code");
        hasError = true;
    } else {
        setError(zipcode, "");
    }

    return hasError;
};
