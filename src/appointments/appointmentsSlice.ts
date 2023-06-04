import { createSlice, PayloadAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { IAppointment } from '../interfaces/IAppointment'
import { getAppointments, postAppointment } from '../services/appointments'

interface AppointmentState {
  appointments: IAppointment[],
  status: string,
  error: string | null
}

const initialState: AppointmentState = { // TODO
  appointments: [],
  status: 'idle',
  error: null
}

export const addNewAppointment = createAsyncThunk(
  'appointments/addNewAppointment',
  async (appointment: IAppointment) => {
    appointment.id = nanoid()
    const response = await postAppointment(appointment)
    return response.data
  }
)

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await getAppointments()
    return response.data
  }
)

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: initialState,
  reducers: {
    appointmentCreated(state, action: PayloadAction<any>) {
      state.appointments.push(action.payload) 
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.pending, (state: AppointmentState) => {
        state.status = 'loading'
      })
      .addCase(fetchAppointments.fulfilled, (state: AppointmentState, action) => {
        state.status = 'succeeded'
        state.appointments = state.appointments.concat(action.payload)
      })
      .addCase(fetchAppointments.pending, (state: AppointmentState) => {
        state.status = 'failed'
        state.error = 'failed to fetch appointments'
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload)
      })
  }
})

export const { appointmentCreated } = appointmentsSlice.actions;
export default appointmentsSlice.reducer


// TODO custom selectors