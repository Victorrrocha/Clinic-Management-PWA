import { useFormikContext } from "formik";
import { useEffect } from "react";
import { queryPatients } from "../services/patients";
import { IAppointment } from "../interfaces/IAppointment";

export const SearchPatients = ({
  searchResponse,
}: {
  searchResponse: Function;
}) => {
  const { values } = useFormikContext<IAppointment>();
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
