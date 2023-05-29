import { useFormikContext } from "formik";
import { useEffect } from "react";
import { queryPatients } from "../services/patients";
import { IAppointmentForm } from "./NewAppointment";

export const SearchPatients = ({
  searchResponse,
}: {
  searchResponse: Function;
}) => {
  const { values } = useFormikContext<IAppointmentForm>();
  const { name } = values;

  useEffect(() => {
    let isCancelled = false;
    queryPatients(name)
      .then((data) => {
        if (!isCancelled) {
          searchResponse(data);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isCancelled = true;
    };
  }, [name]);

  return null;
};
