import { useState } from "react";

import styles from "./NewAppointment.module.css";
import { PatientsList } from "./PatientsList";
import { SearchPatients } from "./SearchPatients.observer";
import { Formik, Form, FormikProps } from "formik";
import InputField from "../components/InputField/InputField";
import { PatientIdentifiedTag } from "./components/PatientIdentifiedTag";

import { IPatient } from "../interfaces/IPatient";
import { PageHeader } from "../components/PageHeader";
import { DatePickerField } from "./components/DatePickerField";

export interface IAppointmentForm {
  name: string,
  email: string,
  phoneNumber: string,
  date: Date,
}

export const initialForm: IAppointmentForm = {
  name: "",
  email: "",
  phoneNumber: "",
  date: new Date,
};

function NewAppointment() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();

  const onSubmit = (values: any, actions: any) => {
    console.log("Submited");

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Name is required";
    }

    if (
      values.email.length > 0 &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (values.phoneNumber.length > 0 && !/^[0-9]*$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    if (!values.date) { // validate if a time was set
      errors.date = "Select a date"
    }

    return errors;
  };

  const handleSearchResponse = (response: any) => {
    if (!selectedPatient) {
      setPatients(response);
    }
  }

  const handlePickedPatient = (patient: IPatient) => {
    setSelectedPatient(patient);
    setPatients([]);
  }

  const handleUnselectingPatient = () => {
    setSelectedPatient(undefined);
  }

  return (
    <section className="section-wrapper">
      <PageHeader title="New Appointment"/>

      <div className={`main ${styles.formItem}`}>
        <Formik
          initialValues={initialForm}
          onSubmit={onSubmit}
          validate={validate}
        >
          {(props: FormikProps<any>) => (
            <Form onSubmit={props.handleSubmit}>
              <div className={styles.formSection}>
                <p className={styles.formSectionTitle}>Patient</p>
                {selectedPatient && <PatientIdentifiedTag name={selectedPatient.name} onUnselect={handleUnselectingPatient}/>}
                <InputField className={selectedPatient && "hidden"} name="name" placeholder="Name" type="text" selectedPatient={selectedPatient}/>
              </div>
              <div className={styles.formSection}>
                <p className={styles.formSectionTitle}>Contact</p>
                {props.submitCount > 0 &&
                  props.values.email === "" &&
                  props.values.phoneNumber === "" && (
                    <p className={styles.errorMessage} role="alert">
                      Inform at least one
                    </p>
                  )}
                <InputField name="email" placeholder="E-mail" type="email" selectedPatient={selectedPatient}/>
                <InputField
                  name="phoneNumber"
                  placeholder="Phone Number"
                  validateImmediately={true}
                  selectedPatient={selectedPatient}
                />
              </div>
              
              <div>
                <p className={styles.formSectionTitle}>Date</p>
                <DatePickerField name="date" />
              </div>

              <button className="btn action" type="submit">
                Create
              </button>

              <SearchPatients searchResponse={handleSearchResponse} />
            </Form>
          )}
        </Formik>
      </div>

      <div className={`main hidden md:block ${styles.patientFilterItem}`}>
        <PatientsList patients={patients} onPickingPatient={handlePickedPatient}/>
      </div>
    </section>
  );
}

export default NewAppointment;
