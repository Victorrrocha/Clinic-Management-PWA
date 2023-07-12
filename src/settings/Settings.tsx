import { useEffect, useState } from "react";
import { FormInput } from "../components/FormInput/FormInput";
import { TextCheckbox } from "../components/TextCheckbox/TextCheckbox";
import { TimePicker } from 'antd';
import { TextRadioGroup } from "../components/TextRadioGroup/TextRadioGroup";
import { initialValues, workDays, weekDaysSelected, options as TimeOption, textFormFields } from "./Settings.constants";
import { ISettings } from "./Settings.interfaces"
import _ from 'lodash';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getSettings, getSettingsInformation, getSettingsStatus } from "./settingsSlice";
import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";
dayjs.extend(customParseFormat)

export function Settings() {

  const [settings, setSettings] = useState<ISettings>(initialValues)
  
  const settingsStatus = useAppSelector(getSettingsStatus)
  let settingInformation = useAppSelector(getSettingsInformation)

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (settingsStatus === 'idle') {
      dispatch(getSettings('12790745000180'));
    } else {
      // @ts-ignore
      setSettings(settingInformation);
    }
  }, [dispatch, getSettings, settingsStatus, settingInformation]);

  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value ?? "";
    setSettings({...settings, [e.target.name]: fieldValue})
  }

  const handleWorkDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((value: ISettings) => {
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

  const selectAllWeekDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSettings({...settings, workSchedule: weekDaysSelected})
    } else {
      setSettings({...settings, workSchedule: workDays})
    }
  }

  const shouldBeChecked = JSON.stringify(settings.workSchedule) === JSON.stringify(weekDaysSelected);

  const handleAppointmentDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((value: ISettings) => {
      let selected = e.target.name;
      let selectedDuration = selected;
      if (selected === 'custom') {
        selectedDuration = "30"
      }
      return {...value, appointmentSelected: selected, appointmentDuration: selectedDuration}
    })
  }

  const handleCustomAppointmentDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = e.target.value;
    setSettings({...settings, appointmentDuration: duration});
  }

  const handleTimeRange = (time: any) => {
    if (time?.length >= 2) {
      let [init, end] = [time[0].$d, time[1].$d];
      init = init.getHours() + ':' + init.getMinutes();
      end = end.getHours() + ':' + end.getMinutes();
      setSettings({...settings, startTime: init, endTime: end});
    }
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(settings);
  }

  return (
    <div className="flex-1">
      <div className="section-wrapper">
        <HeaderTitle title="Settings" subtitle="Update your credentials and your clinic's definitions"/>

        <div className="main">
          <form className="px-5 flex flex-col gap-y-8" onSubmit={submitHandler}>

            <div className="flex flex-col gap-y-3">
              <h3 className="text-lg">General Info</h3>

              <div className="flex flex-col gap-y-3">
                {textFormFields.map(field => {
                  return <FormInput key={field.id} {...field} value={settings[field.name as keyof ISettings]} onchange={handleFieldUpdate}/>
                })}
              </div>
            </div>
            
            <div className="flex flex-col gap-y-3">
              <h3>Work Schedule</h3>
              
              <div>
                <label> 
                  <input type="checkbox" onChange={selectAllWeekDays} checked={shouldBeChecked}/>
                  <span className="ml-2">All Week Days</span>
                </label>
                
              </div>
              
              <div className="flex gap-x-2 flex-wrap gap-y-2 justify-center md:justify-start">
                {settings.workSchedule.map((day, index) => {
                  return <TextCheckbox key={index} {...day} onchange={handleWorkDays} />
                })}
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h3>Hours Working</h3>
              
              <div className="flex justify-center md:justify-start">
                <div className="w-[200px]">
                    <TimePicker.RangePicker 
                      changeOnBlur value={[dayjs(settings.startTime, 'HH:mm'), dayjs(settings.endTime, 'HH:mm')]} 
                      onChange={handleTimeRange} format={'HH:mm'} className="flex-1 rounded-xl"  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h3>Appointment Duration</h3>

              <div className="flex gap-x-2 items-center flex-wrap gap-y-2 justify-center md:justify-start">
                <TextRadioGroup options={TimeOption} selected={settings.appointmentSelected} onchange={handleAppointmentDuration}/>
                <input type="number" min="30" placeholder="...min" value={settings.appointmentSelected === "custom" ? settings.appointmentDuration : ""} 
                  className="w-[80px] text-right" disabled={settings.appointmentSelected !== "custom"} onChange={handleCustomAppointmentDuration}/>
              </div>
            </div>

            <div className="flex gap-x-4 justify-center md:justify-start">
              <button className="btn action" type="submit">Update</button>
              <button className="btn discard" type="button">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}