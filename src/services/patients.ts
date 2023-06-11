import axios from "axios";
import { matchSorter } from "match-sorter";
import { IPatient } from "../interfaces/IPatient";

export async function getPatients() {
    const res = await axios.get('http://localhost:3000/patients');
    return await res.data;
}

export async function queryPatients(params : string) {
    const patients = await getPatients();
    return params ? matchSorter(patients, params, { keys: ['name'] }) : [];
}

export async function createNewPatient(patient: IPatient) {
    const res = await axios.post('http://localhost:3000/patients', patient);
    return res.data;
}