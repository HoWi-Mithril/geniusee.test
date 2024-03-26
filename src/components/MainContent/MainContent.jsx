import './_mainContent.scss'
import FormSection from "../FormSection/FormSection";
import {useEffect, useState} from "react";
import {parseState, scrollToFirstError} from "../../lib/helpers";
import {getErrors, isFieldValid} from "../../lib/formValidation";
import {asyncEmailValidation, sendForm} from "../../lib/actions";
import {initialFormFields} from "../../lib/data";

const MainContent = () => {
    const [formFields, setFormFields] = useState(initialFormFields);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Scroll to the error message
    useEffect(() => {
        if (shouldScroll) {
            scrollToFirstError();
            setShouldScroll(false)
        }
    },[shouldScroll]);

    // Handle inputs onChange event
    const handleChange = (e) => {
        const [copyFormFields, sectionKey, fieldsKey, currentValue] = parseState(e, formFields);

        copyFormFields[sectionKey].fields[fieldsKey].value = currentValue;
        copyFormFields[sectionKey].fields[fieldsKey].errorMessage = '';

        setFormFields(copyFormFields);
    }

    // Handle inputs onBlur event
    const handleBlur = (e) => {
        const [copyFormFields, sectionKey, fieldsKey, currentValue] = parseState(e, formFields);

        // Check is field valid
        const isValid = isFieldValid(fieldsKey, currentValue);

        if (isValid) {
            copyFormFields[sectionKey].fields[fieldsKey].errorMessage = isValid;
            setFormFields(copyFormFields);
        }

        // Add server email validation by async request
        if (fieldsKey === 'email' && currentValue && isValid === '') {
            asyncEmailValidation()
                .then(() => {
                    copyFormFields[sectionKey].fields[fieldsKey].errorMessage = '';
                    setFormFields(copyFormFields);
                })
                .catch((err) => {
                    console.error(err);
                    copyFormFields[sectionKey].fields[fieldsKey].errorMessage = 'Server rejection - Email exist';
                    setFormFields(copyFormFields);
            })
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const [updatedState, isAnyErrors] = getErrors(formFields);

        // Check is any error messages are present
        if (isAnyErrors) {
            // Show errors and scroll
            setFormFields(updatedState);
            setShouldScroll(true);
        } else {
            // Add loader and send server request
            setIsLoading(true);
            sendForm(formFields)
                .then(console.log)
                .catch(console.error)
                .finally( () => {
                    setIsLoading(false);
                })
        }
    }

    return (
        <main className='form-wrapper'>
            <form onSubmit={handleFormSubmit}>
                {
                    Object.keys(formFields).map(
                        sectionKey => (
                            <FormSection
                                key={sectionKey}
                                sectionKey={sectionKey}
                                title={formFields[sectionKey].label}
                                inputFields={formFields[sectionKey].fields}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />
                        )
                    )
                }

                <button className='form-button'
                        disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </main>
    );
};

export default MainContent;
