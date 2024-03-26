// Initial inputs fields
export const initialFormFields = {
    sectionName: {
        label:'Section 1: Personal information',
        fields: {
            firstName: {
                type: 'text',
                name: 'firstName',
                label: 'First name',
                value: '',
                errorMessage:'',
                mask: false
            },
            lastName: {
                type: 'text',
                name: 'lastName',
                label: 'Last name',
                value: '',
                errorMessage:'',
                mask: false
            },
        }
    },
    sectionContact: {
        label:'Section 2. Contact information',
        fields: {
            email: {
                type: 'email',
                name: 'email',
                label: 'Email for receipt',
                value: '',
                errorMessage:'',
                mask: false
            },
            phone: {
                type: 'tel',
                name: 'phone',
                label: 'Phone numbers',
                value: '',
                errorMessage:'',
                mask: '+38 (999) 999 9999'
            },
            country: {
                type: 'text',
                name: 'country',
                label: 'Country',
                value: '',
                options: ['Ukraine', 'Italy', 'France', 'Germany'],
                errorMessage:''
            },
            address: {
                type: 'text',
                name: 'address',
                label: 'Address',
                value: '',
                errorMessage:'',
                mask: false
            }
        }
    },
    sectionPayment: {
        label: 'Section 3. Payment details',
        fields: {
            creditCardNumber: {
                type: 'text',
                name: 'creditCardNumber',
                label: 'Credit card',
                value: '',
                errorMessage:'',
                mask: '9999-9999-9999-9999'
            },
            creditCvvNumber: {
                type: 'text',
                name: 'creditCvvNumber',
                label: 'CVV2 code',
                value: '',
                errorMessage:'',
                mask: '999'
            },
            agreement: {
                type: 'checkbox',
                name: 'agreement',
                label: 'Agreement with terms of use',
                value: false,
                errorMessage:''
            }
        }
    }
}