import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import CalendarPage from './appointments/CalendarPage'
import NewAppointment from './appointments/NewAppointment'
import './index.css'
import Index from './layout/Index'
import PatientsPage from './patients/PatientsPage'

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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
