import { createSlice, PayloadAction, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { IAppointment } from '../interfaces/IAppointment'
import { IPatient } from '../interfaces/IPatient'
import { getAppointments, postAppointment } from '../services/appointments'
import { createNewPatient } from '../services/patients'
import { getRandomPastelColor } from '../utils/utils'

interface AppointmentState {
  appointments: IAppointment[],
  status: string,
  error: string | null
}

const initialState: AppointmentState = { 
  appointments: [],
  status: 'idle',
  error: null
}

export const addNewAppointment = createAsyncThunk(
  'appointments/addNewAppointment',
  async (appointment: IAppointment) => {
    // check if patient is new
    if (!appointment.patientId) {
      appointment.patientId = nanoid();
      const {patientId, name, email, phoneNumber} = appointment;
      const patient: IPatient = {
        id: patientId,
        name,
        email,
        phone: phoneNumber,
        iconColor: getRandomPastelColor()
      } 
      return await createNewPatient(patient)
        .then(async () => {
          appointment.id = nanoid()
          const response = await postAppointment(appointment)
          return response.data
        })
    } else {
      appointment.id = nanoid()
      const response = await postAppointment(appointment)
      return response.data
    }
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
        state.appointments = action.payload
      })
      .addCase(fetchAppointments.rejected, (state: AppointmentState) => {
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

export const selectAllAppointments = (state: RootState) => state.appointments.appointments
export const getAppointmentStatus = (state: RootState) => state.appointments.status
export const getAppointmentError = (state: RootState) => state.appointments.error