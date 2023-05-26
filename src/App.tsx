import { Outlet } from 'react-router'
import './App.css'
import SideMenu from './layout/SideMenu'

function App() {

  return (
    <main>
      <SideMenu />
      <Outlet />
    </main>
  )
}

export default App
