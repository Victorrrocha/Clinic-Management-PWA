import { useEffect, useState } from "react";
import { getPatients } from "../services/patients";

export function usePatients() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients()
        .then(data => {
            setPatients(data);
        })
        .catch(errors => console.log(errors))
    }, [])

    return patients;
}