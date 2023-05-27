import { IPatient } from "../interfaces/IPatient"
import { PatientCard } from "../patients/PatientCard"

export function PatientsList({patients, onPickingPatient}: {patients: any[], onPickingPatient: Function}) {

    const listPatients = patients?.length > 0 && patients.map((patient : IPatient) => {
        return <PatientCard onSelecting={onPickingPatient} key={patient.id} patient={patient} />
    });
    
    return (
       <div className="flex flex-col gap-y-2">
            {listPatients}
       </div>
    )
}