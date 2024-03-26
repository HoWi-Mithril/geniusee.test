import MyInputComponent from "../MyInputComponent/MyInputComponent";
import MySelect from "../MySelect/MySelect";
import MyInputCheckbox from "../MyInputCheckbox/MyInputCheckbox";

const FormSection = ({title, inputFields, handleChange, sectionKey, handleBlur}) => {

    return (
        <section className='section'>
            <h2 className="section-title">{title}</h2>

            {
                Object.keys(inputFields).map( fieldKey => {
                    switch (fieldKey) {
                        case 'country':
                            return <MySelect key={fieldKey}
                                             sectionKey={sectionKey}
                                             handleChange={handleChange}
                                             handleBlur={handleBlur}
                                             {...inputFields[fieldKey]} />
                        case 'agreement' :
                            return <MyInputCheckbox key={fieldKey}
                                                    sectionKey={sectionKey}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    {...inputFields[fieldKey]} />
                        default:
                            return <MyInputComponent key={fieldKey}
                                                     sectionKey={sectionKey}
                                                     handleChange={handleChange}
                                                     handleBlur={handleBlur}
                                                     {...inputFields[fieldKey]} />
                    }
                })
            }
        </section>
    );
};

export default FormSection;