import { NavLink } from "react-router-dom";
import { AiOutlineCalendar, AiFillPushpin, AiOutlineUser } from "react-icons/ai";
import style from './SideMenu.module.css';

function SideMenu() {

    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                <li className="pl-10">
                    <NavLink to={'calendar'} className={({isActive}) => isActive ? "text-white" : ""}> 
                        <span className="flex items-center gap-x-2">
                            <AiOutlineCalendar size={30} /> Calendar
                        </span>
                    </NavLink>
                </li>
                <li className="pl-10">
                    <NavLink to={'new-appointment'} className={({isActive}) => isActive ? "text-white" : ""}>
                        <span className="flex items-center gap-x-2">
                            <AiFillPushpin size={30} /> New Appointment
                        </span>
                    </NavLink>
                </li>
                <li className="pl-10">
                    <NavLink to={'patients'} className={({isActive}) => isActive ? "text-white" : ""}>
                        <span className="flex items-center gap-x-2">
                            <AiOutlineUser size={30} /> Patients
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default SideMenu;