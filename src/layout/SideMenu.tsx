import { NavLink } from "react-router-dom";
import { AiOutlineCalendar, AiFillPushpin, AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import style from './SideMenu.module.css';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getSideMenuState } from "../settings/settingsSlice";
import { toggleSideMenu } from "../settings/settingsSlice";

export interface HamburgerProps {
    action: Function;
}

function SideMenu() {
    const sideMenuOpen = useAppSelector(getSideMenuState);
    const dispatch = useAppDispatch();

    const closeSideMenu = () => {
        dispatch(toggleSideMenu())
    }

    return (
        <>
            <header className={`${style.header} ${sideMenuOpen ? style.header_opened : style.header_closed}`}>
                {/* Customers Section */}
                <div className="flex flex-1 flex-col items-center relative">
                    <span className={style.closeBtn} onClick={closeSideMenu}></span>

                    <div className="h-[40px]"></div>
                    <div className={style.userPhoto}></div>
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
            <div className={`${style.backdrop} ${sideMenuOpen && style.backdropOpened}` }onClick={closeSideMenu}></div>
        </>
    )
}

export default SideMenu;