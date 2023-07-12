import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";
import CalendarComponent from "./CalendarComponent";

function CalendarPage() {
  return (
    <div className="section-wrapper">
      <HeaderTitle title="Hello There!" subtitle="See what's up for today"/>
      <div className="main">
        <CalendarComponent />
      </div>
    </div>
  );
}

export default CalendarPage;
