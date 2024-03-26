import './_myInputComponent.scss'
import InputMask from 'react-input-mask';

const MyInputComponent = ({type, name, label, errorMessage, value, handleChange, sectionKey, handleBlur, mask}) => {
    return (
        <div className={'input-wrapper ' + (errorMessage ? ' _error' : '')}>
            <div className={'label-wrapper ' + (value ? '_active' : '')}>
                <InputMask
                    type={type}
                    name={name}
                    id={`input-data-${name}`}
                    data-section-key={sectionKey}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    mask={mask}
                />
                <label htmlFor={`input-data-${name}`}>{label}</label>
            </div>

            {
                errorMessage && <div className='message-error'>{errorMessage}</div>
            }
        </div>
    );
};

export default MyInputComponent;