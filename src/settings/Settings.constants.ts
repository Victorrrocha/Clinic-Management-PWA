import { ISettings, WorkDays } from "./Settings.interfaces"

export const workDays: WorkDays[] = [
  {
    title: 'SUN',
    checked: false
  },
  {
    title: 'MON',
    checked: false
  },
  {
    title: 'TUE',
    checked: false
  },
  {
    title: 'WED',
    checked: false
  },
  {
    title: 'THU',
    checked: false
  },
  {
    title: 'FRI',
    checked: false
  },
  {
    title: 'SAT',
    checked: false
  }
]

export const weekDaysSelected: WorkDays[] = [
  {
    title: 'SUN',
    checked: false
  },
  {
    title: 'MON',
    checked: true
  },
  {
    title: 'TUE',
    checked: true
  },
  {
    title: 'WED',
    checked: true
  },
  {
    title: 'THU',
    checked: true
  },
  {
    title: 'FRI',
    checked: true
  },
  {
    title: 'SAT',
    checked: false
  }
]

export const options = [
    {
      title: '45 min',
      value: '45'
    },
    {
      title: '60 min',
      value: '60'
    },
    {
      title: '90 min',
      value: '90'
    },
    {
      title: 'Custom',
      value: 'custom'
    },
  ]

export const initialValues: ISettings = {
  id: "",
  administrator: "",
  clinicName: "",
  email: "",
  phoneNumber: "",
  workSchedule: workDays,
  startTime: "08:00 AM",
  endTime: "18:00 PM",
  appointmentSelected: "45",
  appointmentDuration: "45"
}

export const textFormFields = [
  {
    id: 1,
    name: "administrator",
    placeholder: "Administrator"
  },
  {
    id: 2,
    name: "clinicName",
    placeholder: "Clinic"
  },
  {
    id: 3,
    name: "email",
    placeholder: "E-mail",
    type: "email",
  },
  {
    id: 4,
    name: "phoneNumber",
    placeholder: "Phone Number",
    type: "number",
  },
]