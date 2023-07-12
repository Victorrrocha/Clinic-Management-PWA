export interface ISettings  {
  id: string,
  administrator: string;
  clinicName: string;
  email: string;
  phoneNumber: string;
  workSchedule: WorkDays[],
  startTime: string;
  endTime: string;
  appointmentSelected: string,
  appointmentDuration: string
}

export interface WorkDays {
  title: string,
  checked: boolean
}