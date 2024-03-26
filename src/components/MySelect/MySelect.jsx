
const MySelect = ({name, errorMessage, value, handleChange, sectionKey, handleBlur, options}) => {
    return (
        <div className={'input-wrapper ' + (errorMessage ? ' _error' : '')}>
            <div className={'label-wrapper ' + (value ? '_active' : '')}>
                <select name={name}
                        data-section-key={sectionKey}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                >
                    <option key={'default'} disabled={true} value={''}>Select Country</option>
                    {
                        options.map(opt => <option key={opt} value={opt}>{opt}</option>)
                    }
                </select>
            </div>

            {
                errorMessage && <div className='message-error'>{errorMessage}</div>
            }
        </div>
    );
};

export default MySelect;
