import { useFormikContext } from "formik";
import { useEffect } from "react";
import { queryPatients } from "../services/patients";
import { IAppointmentForm } from "./NewAppointment";

export const SearchPatients = ({searchResponse, } : {searchResponse : Function}) => {
    const { values } = useFormikContext<IAppointmentForm>();
    const { name } = values;
  
    useEffect(() => {
      queryPatients(name)
        .then((data) => searchResponse(data))
        .catch(error => console.error(error))
    }, [name]);
  
    return null;
  };