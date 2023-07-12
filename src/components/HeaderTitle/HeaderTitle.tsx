import { useAppDispatch } from "../../app/hooks";
import { toggleSideMenu } from "../../settings/settingsSlice";
import { Hamburger } from "../Hamburger/Hamburger";

export function HeaderTitle({title, subtitle}: {title: string, subtitle: string}) {

  const dispatch = useAppDispatch();

  function openSideMenu() {
      dispatch(toggleSideMenu());
  }

  return (
    <div className="flex flex-col text-white pr-0 header mb-5">
      <div className="bg-primary py-1 px-2 flex gap-x-4">
        {<Hamburger action={openSideMenu}/>}
        <h1>{title}</h1>
      </div>
      <p className="bg-primary-light py-1 px-2 text-base">{subtitle}</p>
    </div>
  )
}