import { FieldHookConfig, FormikContextType, useField, useFormikContext } from "formik";
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
  // console.log(" DAte field")
  const dispatch = useAppDispatch();

  const appointmentsCreated = useAppSelector(selectAllAppointments);
  const appointmentStatus = useAppSelector(getAppointmentStatus);

  const { setFieldValue, values } = useFormikContext() as { setFieldValue: Function, values: IAppointment};
  const [field] = useField(props.name);
  const selected = new Date(field.value);

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedTime, setSelectedTime] = useState(values.hour);

  useEffect(() => {
    setSelectedTime(values.hour);
  }, [values.hour])

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
    if (day && (selected && !isSameDay(day, selected) || !selected) ) {
      setSelectedTime("");
      setFieldValue(field.name, day?.toLocaleString());
      setFieldValue("hour", null);
      setAppointments(getAppointmentsFor(day));
    }
  };

  const handleAppointmentHour = (hour: string) => {
    if (selectedTime !== hour) {
      setSelectedTime(hour);
    }
    selected?.setHours(+hour);
    setFieldValue(field.name, selected?.toLocaleString());
    setFieldValue("hour", hour);
  };

  useEffect(() => {
    if (appointmentStatus === "idle") {
      dispatch(fetchAppointments())
    }
  }, [dispatch, fetchAppointments])

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
        selected={selected || undefined}
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
          {field.value ? availableSlots : ""}
        </div>
      </div>
    </div>
  );
}
