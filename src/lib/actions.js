import {getFormDataFromState, randomServerValidation} from "./helpers";

// Fake time delay
const takeTime = async () => {
    await new Promise(res => {
        setTimeout(()=>{
            res();
        }, 1000)
    })
}

// Email server async request
export const asyncEmailValidation = async () => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (randomServerValidation()) {
                reject('Rejected 25%');
            } else {
                resolve();
            }
        }, 1000)
    })
}

export const sendForm = async (formFields) => {
    return await takeTime().then(res => {
        return getFormDataFromState(formFields);
    });
}