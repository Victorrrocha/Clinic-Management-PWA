import { PageHeader } from "../components/PageHeader";
import CalendarComponent from "./CalendarComponent";

function CalendarPage() {
  return (
    <div className="section-wrapper">
      <PageHeader title="See what's up today" />
      <div className="main">
        <CalendarComponent />
      </div>
    </div>
  );
}

export default CalendarPage;
