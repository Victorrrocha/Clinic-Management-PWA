import { useState } from "react";
import { FormInput } from "../components/FormInput/FormInput";
import { TextCheckbox } from "../components/TextCheckbox/TextCheckbox";
import { TimePicker } from 'antd';
import _ from 'lodash';
import { TextRadioGroup } from "../components/TextRadioGroup/TextRadioGroup";

interface Values  {
  name: string;
  clinicName: string;
  email: string;
  phoneNumber: string;
  workSchedule: WorkDays[],
  startTime: string;
  endTime: string;
  appointmentDuration: string
}

interface WorkDays {
  title: string,
  checked: boolean
}

const workDays: WorkDays[] = [
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

const options = [
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

const initialValues: Values = {
  name: "",
  clinicName: "",
  email: "",
  phoneNumber: "",
  workSchedule: workDays,
  startTime: "",
  endTime: "",
  appointmentDuration: "45"
}

const textFormFields = [
  {
    id: 1,
    name: "name",
    placeholder: "Name"
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

export function Settings() {

  const [settings, setSettings] = useState(initialValues)

  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value ?? "";
    setSettings({...settings, [e.target.name]: fieldValue})
  }

  const handleWorkDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((value: Values) => {
      const day = e.target.name;
      const checked = e.target.checked;
      const dayIndex = value.workSchedule.findIndex(workday => workday.title === day);
      if (dayIndex < 0) {
        return value;
      }
      const newValue = _.cloneDeep(value);
      newValue.workSchedule[dayIndex].checked = !!checked;

      return newValue;
    })
  }

  const handleAppointmentDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((value: Values) => {
      let selected = e.target.name;
      if (selected === 'custom') {
        selected = '30';
      }
      return {...value, appointmentDuration: selected}
    })
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="flex-1">
      <div>
        <div className="flex flex-col text-white p-5 pr-0">
          <h1 className="bg-primary py-1 px-2">Settings</h1>
          <p className="bg-primary-light py-1 px-2 ml-5 text-base">Update your credentials and your clinic's definitions</p>
        </div>

        <div className="ml-5">
          <form className="pl-5 flex flex-col gap-y-8" onSubmit={submitHandler}>

            <div className="flex flex-col gap-y-3">
              <h3 className="text-lg">General Info</h3>

              <div className="ml-4 flex flex-col gap-y-3">
                {textFormFields.map(field => {
                  return <FormInput key={field.id} {...field} value={settings[field.name as keyof Values]} onchange={handleFieldUpdate}/>
                })}
              </div>
            </div>
            
            <div className="flex flex-col gap-y-3">
              <h3>Work Schedule</h3>
              
              <div>
                <label> 
                  <input type="checkbox" />
                  <span className="ml-2">All Week Days</span>
                </label>
                
              </div>
              
              <div className="flex gap-x-2">
                {settings.workSchedule.map((day, index) => {
                  return <TextCheckbox key={index} {...day} onchange={handleWorkDays} />
                })}
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h3>Hours Working</h3>

              <div className="w-[350px] flex">
                  <TimePicker.RangePicker className="flex-1 rounded-xl" />
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h3>Appointment Duration</h3>

              <div className="flex gap-x-2 items-center">
                <TextRadioGroup options={options} selected={settings.appointmentDuration} onchange={handleAppointmentDuration}/>
                <input type="number" min="30" placeholder="...min" className="w-[75px] text-right" disabled={settings.appointmentDuration !== "custom"}/>
              </div>
            </div>

            <div className="btn-row">
              <button className="btn action" type="submit">Update</button>
              <button className="btn discard" type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}