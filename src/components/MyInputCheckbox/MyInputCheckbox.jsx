import './_myInputCheckbox.scss'

const MyInputCheckbox = ({name, label, errorMessage, value, handleChange, sectionKey, handleBlur}) => {
    return (
        <div className={'input-wrapper checkbox'}>
            <label>
                <input type='checkbox'
                       name={name}
                       checked={value}
                       data-section-key={sectionKey}
                       onBlur={handleBlur}
                       onChange={handleChange} />
                <span>{label}</span>
            </label>

            {
                errorMessage && <div className='message-error'>{errorMessage}</div>
            }
        </div>
    );
};

export default MyInputCheckbox;