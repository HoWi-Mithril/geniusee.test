
// Copy of state object
export const getDeepCopyForm = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

// Get information from event
export const  parseState = (e, formFields) => {
    let copyFormFields = getDeepCopyForm(formFields),
        sectionKey = e.currentTarget.dataset.sectionKey,
        fieldsKey = e.currentTarget.name,
        currentValue = e.currentTarget.value;

    if (e.currentTarget.type === 'checkbox') {
        currentValue = e.currentTarget.checked;
    }

    return [copyFormFields, sectionKey, fieldsKey, currentValue];
}

// Get random 75% - true and 25% - false;
export const randomServerValidation = () => (Math.floor(Math.random() * 4) + 1) === 4;

// Scroll action to the first error element
export const scrollToFirstError = () => {
    let element = document.querySelector('.input-wrapper._error');
    element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
    });
}

// Get data from input fields State
export const getFormDataFromState = (fieldsState) => {
    return {
        firstName: fieldsState.sectionName.fields.firstName.value,
        lastName: fieldsState.sectionName.fields.lastName.value,

        email: fieldsState.sectionContact.fields.email.value || 'not-provided',
        phone: getDigits(fieldsState.sectionContact.fields.phone.value),
        country: fieldsState.sectionContact.fields.country.value,
        address: fieldsState.sectionContact.fields.address.value,

        creditCardNumber: getDigits(fieldsState.sectionPayment.fields.creditCardNumber.value),
        creditCvvNumber: fieldsState.sectionPayment.fields.creditCvvNumber.value,
        agreement: fieldsState.sectionPayment.fields.agreement.value,
    }
}

// Digits filter
function getDigits(str) {
    return str.split('').filter(char => Number(char)).join('');
}