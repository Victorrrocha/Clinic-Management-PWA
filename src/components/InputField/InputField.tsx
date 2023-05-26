import styles from "./InputField.module.css";
import { useField, FieldHookConfig } from "formik";

const InputField = (props: FieldHookConfig<string> & {label?: string, validateImmediately?: boolean}) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.formSection}>
            {props.label && (
                <p className={styles.formSectionTitle}>{props.label}</p>
            )}
            <input {...field} placeholder={props.placeholder} type={props.type} />
        
            {((meta.touched || props.validateImmediately) && meta.error)  && (
                <p className={styles.errorMessage} role="alert">
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default InputField;