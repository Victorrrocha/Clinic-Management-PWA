import { PatientCard } from "./PatientCard";
import { usePatients } from "../hooks/usePatients";
import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";

function PatientsPage() {
    const patients = usePatients();

    return (
        <div className="section-wrapper">
            <HeaderTitle title="Patients" subtitle="See information about your patients"/>

            <div className="main">
                <div className="flex gap-[20px] flex-wrap px-5 justify-center md:justify-start">
                    {patients.length > 0 && patients.map((patient: any) => (
                        <PatientCard key={patient.id} patient={patient} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PatientsPage;