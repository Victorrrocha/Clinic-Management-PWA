import axios from "axios";

export const postAppointment = (newAppointment: any) => {
  return axios.post('http://localhost:3000/appointments', newAppointment)
}

export const getAppointments = () => {
  return axios.get('http://localhost:3000/appointments')
}