import { styled } from "styled-components";
import { PatientCard } from "./PatientCard";
import { usePatients } from "../hooks/usePatients";
import { PageHeader } from "../components/PageHeader";

function PatientsPage() {

    const ListContainer = styled.div`
        display: flex;
        column-gap: 10px;
        row-gap: 10px;
        flex-wrap: wrap;
    `

    const patients = usePatients();

    return (
        <div className="section-wrapper">
            <PageHeader title="Patients" />

            <div className="main">
                <ListContainer>
                    {patients.length > 0 && patients.map((patient: any) => (
                        <PatientCard key={patient.id} patient={patient} />
                    ))}
                </ListContainer>
            </div>
        </div>
    )
}

export default PatientsPage;