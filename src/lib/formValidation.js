import {getDeepCopyForm} from "./helpers";

const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    phonePattern = /^\+38 \(([0-9]{3})\) ([0-9]{3}) ([0-9]{4})$/,
    cardNumberPattern = /([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})$/,
    cvvNumberPattern = /([0-9]{3})$/;

// Check is form data valid
export const isFieldValid = (name, value) => {
    switch (name) {
        case 'firstName':
        case 'lastName':
        case 'country':
        case 'address':
            return isRequired(value);
        case 'email':
            return isEmailValid(value);
        case 'phone':
            return isPhoneValid(value);
        case 'creditCardNumber':
            return isCardNumberValid(value);
        case 'creditCvvNumber':
            return isCvvNumber(value);
        case 'agreement':
            return isChecked(value);
        default:
            return '';
    }
}

// Check is value added
const isRequired = (value) => {
    if (!value.trim()) {
        return 'Field is required'
    }

    return '';
}

// Check is section fields valid
const isEmailValid = (email) => {
    if (email.trim().length && !emailPattern.test(email)) {
        return "Incorrect email";
    }

    return '';
}

const isPhoneValid = (phone) => {
    if (!phone.trim()) {
        return 'Field is required'
    }

    if (!phonePattern.test(phone)) {
        return "Incorrect phone number +38 (XXX) XXX XXXX";
    }

    return '';
}

const isCardNumberValid = (cardNumber) => {
    if (!cardNumber.trim()) {
        return 'Field is required'
    }

    if (!cardNumberPattern.test(cardNumber)) {
        return "Incorrect card number XXXX XXXX XXXX XXXX";
    }

    return '';
}

const isCvvNumber = (cvvNumber) => {
    if (!cvvNumber.trim()) {
        return 'Field is required'
    }

    if (!cvvNumberPattern.test(cvvNumber)) {
        return "Incorrect cvv number XXX";
    }

    return '';
}

const isChecked = (value) => {
    if (!value) {
        return 'Field is required'
    }

    return '';
}

// Check if forms input fields has any errors
export const getErrors = (fields) => {
    let copyFormFields = getDeepCopyForm(fields),
        isAnyErrors = false;

    Object.keys(fields).forEach(key => {
        let fieldKeys = Object.keys(fields[key].fields);

        fieldKeys.forEach(fieldKey => {
            let value = fields[key].fields[fieldKey].value,
                name = fields[key].fields[fieldKey].name,
                errorMessage = isFieldValid(name, value);

            if (errorMessage.length > 0) {
                isAnyErrors = true;
            }

            if (name === 'email' && fields[key].fields[fieldKey].errorMessage.length > 0) {
                isAnyErrors = true;
                errorMessage = fields[key].fields[fieldKey].errorMessage;
            }

            copyFormFields[key].fields[fieldKey].errorMessage = errorMessage;
        })
    });

    return [copyFormFields, isAnyErrors];
}