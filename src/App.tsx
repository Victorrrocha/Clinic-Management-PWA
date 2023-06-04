import { Outlet } from 'react-router'
import './App.css'
import { Footer } from './layout/Footer'
import SideMenu from './layout/SideMenu'

function App() {

  return (
    <>
      <main>
        <SideMenu />
        <div className='flex flex-col w-[100%]'>
            <Outlet />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
