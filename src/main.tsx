import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import CalendarPage from './calendar/CalendarPage'
import NewAppointment from './appointments/NewAppointment'
import './index.css'
import Index from './layout/Index'
import PatientsPage from './patients/PatientsPage'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Settings } from './settings/Settings'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      },
      {
        path: 'new-appointment',
        element: <NewAppointment />
      },
      {
        path: 'patients',
        element: <PatientsPage />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);
