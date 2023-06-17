import styles from "./InputField.module.css";
import { useField, FieldHookConfig, useFormikContext } from "formik";
import { IPatient } from "../../interfaces/IPatient";
import { useEffect } from "react";
import { initialForm } from "../../appointments/NewAppointment";

// Custom Input field for Formik form
const InputField = (props: FieldHookConfig<string> & {label?: string, validateImmediately?: boolean, selectedPatient?: IPatient}) => {
    const [field, meta] = useField(props.name);

    const { setFieldValue, resetForm } = useFormikContext();

    useEffect(() => {
        if (props.selectedPatient) {
            const { name, email, phone } = props.selectedPatient;
            switch(props.name) {
                case 'name':
                    setFieldValue(props.name, name);
                    break;
                case 'email':
                    setFieldValue(props.name, email);
                    break;
                case 'phoneNumber':
                    setFieldValue(props.name, phone);
                    break;
            }
        } else {
            resetForm({ values: initialForm });
        }
    }, [props.selectedPatient])

    return (
        <div className={styles.formSection}>
            {props.label && (
                <p className={styles.formSectionTitle}>{props.label}</p>
            )}
            <input disabled={!!props.selectedPatient} {...field} placeholder={props.placeholder} type={props.type} onChange={e =>  field.onChange(e)} />
        
            {((meta.touched || props.validateImmediately) && meta.error)  && (
                <p className={styles.errorMessage} role="alert">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default InputField;