/**
 * starting code from https://github.com/christopher-caldwell/react-big-calendar-demo.
 */
import { FC, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event as CalendarEvent } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import addHours from 'date-fns/addHours'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { fetchAppointments, getAppointmentStatus, selectAllAppointments } from '../appointments/appointmentsSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IAppointment } from '../interfaces/IAppointment'

const CalendarComponent: FC = () => {
  const dispatch = useAppDispatch()

  const appointments = useAppSelector(selectAllAppointments)
  const appointmentStatus = useAppSelector(getAppointmentStatus)

  useEffect(() => {
    // Upon loading, check if initial load wasn´t performed. i.e status === idle
    if (appointmentStatus === 'idle') {
      dispatch(fetchAppointments())
    }
  }, [appointmentStatus, dispatch])

  const createAppointmentsEvents = (appointments : IAppointment[]) => {
    const formattedAppointments = appointments.map(appointment => {
      const date = new Date(appointment.date);
      return {
        title: appointment.name,
        start: date,
        end: addHours(date, 1)
      }
    })
    console.log(formattedAppointments)
    return formattedAppointments
  }

  let content = <></>

  if (appointmentStatus === 'loading') {
    content = <p>Loading</p>
  }
  else if (appointmentStatus === 'succeeded') {
    const appointmentsEvents = createAppointmentsEvents(appointments)

    content = (
      <DnDCalendar
        defaultView='week'
        events={appointmentsEvents}
        localizer={localizer}
        // onEventDrop={onEventDrop}
        // onEventResize={onEventResize}
        resizable
        style={{ height: '80vh' }}
      />
    )
  }

  // const [events, setEvents] = useState<Event[]>([
  //   {
  //     title: 'Learn cool stuff',
  //     start,
  //     end,
  //   },
  // ])

  // const onEventResize: withDragAndDropProps['onEventResize'] = data => {
  //   const { start, end } = data

  //   setEvents(currentEvents => {
  //     const firstEvent = {
  //       start: new Date(start),
  //       end: new Date(end),
  //     }
  //     return [...currentEvents, firstEvent]
  //   })
  // }

  // const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
  //   console.log(data)
  // }

  return (
    content
  )
}

// Localizer Configuration
const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
//@ts-ignore
const DnDCalendar = withDragAndDrop(Calendar)

export default CalendarComponent;