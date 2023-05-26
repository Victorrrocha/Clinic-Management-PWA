import { NavLink } from "react-router-dom";
import styled from "styled-components";

function SideMenu() {
    
    const Nav = styled.nav`
        background-color: #A4D0A4;
        min-width: 250px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 0 2.6px;
    `

    const Ul = styled.ul`
        list-style: none;
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        color: #000;
    `

    return (
        <Nav>
            <Ul>
                <li>
                    <NavLink to={'calendar'}>Calendar</NavLink>
                </li>
                <li>
                    <NavLink to={'new-appointment'}>New Appointment</NavLink>
                </li>
                <li>
                    <NavLink to={'patients'}>Patients</NavLink>
                </li>
            </Ul>
        </Nav>
    )
}

export default SideMenu;