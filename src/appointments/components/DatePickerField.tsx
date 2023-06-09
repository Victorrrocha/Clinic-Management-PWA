import { FieldHookConfig, useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AppointmentHour } from "../../components/styled/AppointmentHour";
import "react-day-picker/dist/style.css";
import { fetchAppointments, getAppointmentStatus, selectAllAppointments } from "../appointmentsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isSameDay } from "date-fns";
import { IAppointment } from "../../interfaces/IAppointment";

const css = `
  .my-selected:not([disabled]) {
    font-weight: bold;
    color: white;
    background-color: #0079FF;
  }

  .my-selected:hover:not([disabled]) {
    background-color: #0079FF !important;
  }
`

export function DatePickerField(props: FieldHookConfig<string>) {
  const dispatch = useAppDispatch();

  const appointmentsCreated = useAppSelector(selectAllAppointments);
  const appointmentStatus = useAppSelector(getAppointmentStatus);
  
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  const [selected, setSelected] = useState<Date>();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    if (appointmentStatus === "idle") {
      dispatch(fetchAppointments())
    }
  }, [dispatch, fetchAppointments])

  // select all 
  let footer = <p>Please pick a day.</p>;

  if (selected) {
    footer = <p>{appointments.length} appointments today</p>;
  }

  const isHourTaken = (hour: number) => {
    const hoursTaken = appointments.map(appointment => {
      return new Date(appointment.date).getHours();
    })

    return hoursTaken.includes(hour);
  }

  const getAppointmentsFor = (day: Date) => {
    return appointmentsCreated.filter(appointment => {
      return isSameDay(day, new Date(appointment.date));
    })
  }

  const handleSelectDate = (day: Date | undefined) => {
    if (day) {
      setFieldValue(field.name, day?.toLocaleString());
      setAppointments(getAppointmentsFor(day));
      setSelected(day);
      console.log(day?.toLocaleString());
    }
  };

  const handleAppointmentHour = (hour: string) => {
    if (selectedTime !== hour) {
      setSelectedTime(hour);
    } else {
      setSelectedTime(""); // form should be invalid
    }
    selected?.setHours(+hour);
    console.log(selected);
    setFieldValue(field.name, selected?.toLocaleString());
  };

  const availableSlots = (
    Array.from({ length: 8 }, (_, i) => i + 8).map((hour) => {
      return (
        <AppointmentHour
          key={hour}
          onClick={() => {
            handleAppointmentHour(hour.toString());
          }}
          $selected={selectedTime == hour.toString()}
          $unavailable={isHourTaken(hour)}
        >
          {hour}:00
        </AppointmentHour>
      );
    })
  )

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <style>{css}</style>
      {/* Select day */}
      <DayPicker
        {...props}
        {...field}
        mode="single"
        required
        selected={(field.value && new Date(field.value)) || undefined}
        onSelect={handleSelectDate}
        modifiersClassNames={{
          selected: 'my-selected'
        }}
        footer={footer}
      />

      {/* select time */}
      <div className="flex flex-col gap-y-2 w-[200px]">
        <h3 className="text-lg font-medium">Available Hours: </h3>
        <div className="flex gap-1 flex-wrap">
          {selected ? availableSlots : ""}
        </div>
      </div>
    </div>
  );
}
