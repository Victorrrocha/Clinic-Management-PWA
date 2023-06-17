import { Outlet } from 'react-router'
import './App.css'
import { Footer } from './layout/Footer'
import SideMenu from './layout/SideMenu'

function App() {

  return (
    <main>
      <SideMenu />
      <div className="w-[100%] flex flex-col overflow-x-scroll">
          <Outlet />
        <Footer />
      </div>
    </main>
  )
}

export default App
