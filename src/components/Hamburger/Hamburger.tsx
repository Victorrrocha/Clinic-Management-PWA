import style from "./Hamburger.module.css";
import { HamburgerProps } from "../../layout/SideMenu";

export function Hamburger({action}: HamburgerProps ) {
  return (
    <div onClick={() => action()} className={style.hamburgerContainer}>
        <span className={style.hamburger}></span>
    </div>
  )
}