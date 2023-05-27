import { useState } from "react";

import styles from "./NewAppointment.module.css";
import { PatientsList } from "./PatientsList";
import { SearchPatients } from "./SearchPatients.observer";
import { Formik, Form, FormikProps } from "formik";
import InputField from "../components/InputField/InputField";
import { AppointmentHour } from "../components/styled/AppointmentHour";
import { PatientIdentifiedTag } from "./components/PatientIdentifiedTag";

import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { IPatient } from "../interfaces/IPatient";

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
  const [selectedTime, setSelectedTime] = useState("");
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

    return errors;
  };

  // Calendar
  const [selected, setSelected] = useState<Date>();
  const [appointments, setAppointments] = useState(0);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>{appointments} appointments today</p>;
  }

  const handleSelected = (selected: any) => {
    setAppointments(Math.floor(Math.random() * (9 - 0 + 1) + 0));
    setSelected(selected);
    console.log(selected);
  };
  // calendar

  const handleSearchResponse = (response: any) => {
    if (!selectedPatient) {
      setPatients(response);
    }
  }

  const handlePickedPatient = (patient: IPatient) => {
    setSelectedPatient(patient);
    setPatients([]);

    // If in desktop Load Patient information page
    // If in mobile see patient information modal button
  }

  const handleUnselectingPatient = () => {
    setSelectedPatient(undefined);
  }

  return (
    <section className="section-wrapper">
      <h1 className="text-2xl font-bold">New Appointment</h1>

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
                <div className="flex items-start">
                  {/* Data Picker */}
                  <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={handleSelected}
                    footer={footer}
                  />

                  {/* Confirm time */}
                  <div className="flex flex-col gap-y-2">
                    <h3 className="text-lg font-medium">Available Hours: </h3>
                    <div className="flex gap-1 flex-wrap">
                      {Array.from({ length: 8 }, (_, i) => i + 8).map((hour) => {
                        return (
                          <AppointmentHour
                            key={hour}
                            onClick={() => {
                              setSelectedTime(hour.toString());
                            }}
                            $selected={selectedTime == hour.toString()}
                          >
                            {hour}:00
                          </AppointmentHour>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn action" type="submit">
                Create
              </button>

              <SearchPatients searchResponse={handleSearchResponse} />
            </Form>
          )}
        </Formik>
      </div>

      <div className={`main ${styles.patientFilterItem}`}>
        <PatientsList patients={patients} onPickingPatient={handlePickedPatient}/>
      </div>
    </section>
  );
}

export default NewAppointment;
