import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { PatientCard } from "./PatientCard";

function PatientsPage() {

    const ListContainer = styled.div`
        display: flex;
        column-gap: 10px;
        row-gap: 10px;
        flex-wrap: wrap;
    `

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        async function getPatients() {
            const response = await axios.get('http://localhost:3000/patients');
            const returnPatients = response.data;
            setPatients(returnPatients);
        }
        try{
            getPatients();
        }
        catch(error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="section-wrapper">
            <h1>Patients Page</h1>

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