import axios from "axios"
import { ISettings } from "../settings/Settings.interfaces";

export const getSettingsFor = async (id: string) => {
  const response = await (await axios.get('http://localhost:3000/clinics')).data as Array<ISettings>;
  const foundClinic = response.find(clinic => clinic.id === id);
  return foundClinic;
}