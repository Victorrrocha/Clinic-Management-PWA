import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addNewAppointment } from "./appointmentsSlice";

import styles from "./NewAppointment.module.css";
import { PatientsList } from "./PatientsList";
import { SearchPatients } from "./SearchPatients.observer";
import { Formik, Form, FormikProps } from "formik";
import InputField from "../components/InputField/InputField";
import { PatientIdentifiedTag } from "./components/PatientIdentifiedTag";

import { IPatient } from "../interfaces/IPatient";
import { DatePickerField } from "./components/DatePickerField";
import { IAppointment } from "../interfaces/IAppointment";
import { useNavigate } from "react-router";
import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";

export const initialForm: IAppointment = {
  id: "",
  patientId: "",
  name: "",
  email: "",
  phoneNumber: "",
  date: "",
  hour: ""
};

function NewAppointment() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values: IAppointment, actions: any) => {
    if (selectedPatient) {
      values.patientId = selectedPatient.id;
    }
    await dispatch(addNewAppointment(values)).unwrap()
      .then(() => {
        actions.setSubmitting(false);
        actions.resetForm(initialForm);
        setSelectedPatient(undefined);
        navigate("/new-appointment");
      })
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Name is required";
    }

    if (values.email.length <= 0 && values.phoneNumber.length <= 0) {
      errors.contact = "Need to provide a contact information"
      errors.email = "Invalid email address";
      errors.phoneNumber = "Invalid phone number";
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

    if (!values.date) {
      errors.date = "Select a date";
    }

    if (!values.hour) {
      errors.hour = "Select an hour";
    }
    return errors;
  };

  const handleSearchResponse = (response: any) => {
    if (!selectedPatient) {
      setPatients(response);
    }
  };

  const handlePickedPatient = (patient: IPatient) => {
    setSelectedPatient(patient);
    setPatients([]);
  };

  const handleUnselectingPatient = () => {
    setSelectedPatient(undefined);
  };

  return (
    <section className="flex-1">
      <div>
        <HeaderTitle title="New Appointment" subtitle="Type the name to search for previous patients"/>
      </div>

      <div className="flex gap-x-10 p-10">
        <div className={` ${styles.formItem}`}>
          <Formik
            initialValues={initialForm}
            onSubmit={onSubmit}
            validate={validate}
          >
            {(props: FormikProps<any>) => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <div className={styles.formSection}>
                    <p className={styles.formSectionTitle}>Patient</p>
                    {selectedPatient && (
                      <PatientIdentifiedTag
                        name={selectedPatient.name}
                        onUnselect={handleUnselectingPatient}
                      />
                    )}
                    <InputField
                      className={selectedPatient && "hidden"}
                      name="name"
                      placeholder="Name"
                      type="text"
                      selectedPatient={selectedPatient}
                    />
                  </div>
                  <div className={styles.formSection}>
                    <p className={styles.formSectionTitle}>Contact</p>
                    <small role="alert">
                      Inform at least one
                    </small>
                    <InputField
                      name="email"
                      placeholder="E-mail"
                      type="email"
                      selectedPatient={selectedPatient}
                    />
                    <InputField
                      name="phoneNumber"
                      placeholder="Phone Number"
                      selectedPatient={selectedPatient}
                    />
                  </div>

                  <div>
                    <p className={styles.formSectionTitle}>Date</p>
                    <DatePickerField name="date"/>
                  </div>
                  
                  <div className="btn-row">
                    <button 
                      className="btn action" 
                      disabled={(!props.dirty || !props.isValid)} type="submit">
                      Submit
                    </button>

                    <button className="btn discard" disabled={(!props.dirty)}>Clear</button>
                  </div>

                  <SearchPatients searchResponse={handleSearchResponse} />
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className={`hidden md:block ${styles.patientFilterItem}`}>
          <PatientsList
            patients={patients}
            onPickingPatient={handlePickedPatient}
          />
        </div>
      </div>
    </section>
  );
}

export default NewAppointment;
