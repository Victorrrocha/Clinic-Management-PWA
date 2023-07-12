import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from '../appointments/appointmentsSlice'
import settingsReducer from '../settings/settingsSlice'

export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    settings: settingsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch