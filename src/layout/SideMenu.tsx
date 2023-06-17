import { NavLink } from "react-router-dom";
import { AiOutlineCalendar, AiFillPushpin, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import style from './SideMenu.module.css';

function SideMenu() {
    

    return (
        <header className={style.header}>
            {/* Customers Section */}
            <div className="flex flex-1">
                <p>Customers Name and photo</p>
            </div>

            {/* Navigation */}
            <nav className={`${style.nav} flex flex-1`}>
                <ul className={style.ul}>
                    <li>
                        <NavLink to={'calendar'} className={({isActive}) => isActive ? "nav-item nav-active" : "nav-item nav-inactive"}> 
                            <span className="flex items-center gap-x-2">
                                <AiOutlineCalendar size={30} /> Calendar
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'new-appointment'} className={({isActive}) => isActive ? "nav-item nav-active" : "nav-item nav-inactive"}>
                            <span className="flex items-center gap-x-2">
                                <AiFillPushpin size={30} /> New Appointment
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'patients'} className={({isActive}) => isActive ? "nav-item nav-active" : "nav-item nav-inactive"}>
                            <span className="flex items-center gap-x-2">
                                <AiOutlineUser size={30} /> Patients
                            </span>
                        </NavLink>
                    </li>

                </ul>
            </nav>

            {/* Settings */}
            <div className="flex flex-1 items-end">
                <div className="w-[100%]">
                    <hr className="mb-[20px]" />
                    <NavLink to={'settings'} className={({isActive}) => isActive ? "nav-item nav-active" : "nav-item nav-inactive"}>
                        <span className="flex items-center gap-x-2">
                            <AiOutlineSetting size={30} /> Settings
                        </span>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default SideMenu;