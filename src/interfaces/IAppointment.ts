export interface IAppointment {
  id: string,
  patientId: string,
  name: string,
  email?: string,
  phoneNumber?: string,
  date: string,
  hour: string
}