import { FieldHookConfig, useField, useFormikContext } from "formik";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { AppointmentHour } from "../../components/styled/AppointmentHour";
import "react-day-picker/dist/style.css";

export function DatePickerField(props: FieldHookConfig<string>) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);

  const [selected, setSelected] = useState<Date>();
  const [appointments, setAppointments] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");

  let footer = <p>Please pick a day.</p>;

  if (selected) {
    footer = <p>{appointments} appointments today</p>;
  }

  const handleSelectDate = (val: Date | undefined) => {
    setFieldValue(field.name, val?.toLocaleString());

    setAppointments(Math.floor(Math.random() * (9 - 0 + 1) + 0));
    setSelected(val);
    console.log(val?.toLocaleString());
  };

  const handleAppointmentHour = (hour: string) => {
    if (selectedTime !== hour) {
      setSelectedTime(hour);
    } else {
      setSelectedTime("");
    }
    selected?.setHours(+hour);
    console.log(selected);
    setFieldValue(field.name, selected?.toLocaleString());
  };

  return (
    <div className="flex flex-col lg:flex-row items-start">
      {/* Select day */}
      <DayPicker
        {...props}
        {...field}
        mode="single"
        selected={(field.value && new Date(field.value)) || undefined}
        onSelect={handleSelectDate}
        footer={footer}
      />

      {/* select time */}
      <div className="flex flex-col gap-y-2 w-[200px]">
        <h3 className="text-lg font-medium">Available Hours: </h3>
        <div className="flex gap-1 flex-wrap">
          {Array.from({ length: 8 }, (_, i) => i + 8).map((hour) => {
            return (
              <AppointmentHour
                key={hour}
                onClick={() => {
                  handleAppointmentHour(hour.toString());
                }}
                $selected={selectedTime == hour.toString()}
              >
                {hour}:00
              </AppointmentHour>
            );
          })}
        </div>
      </div>
    </div>
  );
}
