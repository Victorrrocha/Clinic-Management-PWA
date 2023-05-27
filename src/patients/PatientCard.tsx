import styles from './PatientCard.module.css'

export interface Patient {
    id: string,
    name: string,
    email: string,
    phone: string,
    iconColor: string
}

export function PatientCard({patient, onSelecting}: { patient: Patient, onSelecting?: Function}) {

    const getInitials = (name: string): string => {
        const initials = name
            .split(' ')
            .map((word: string) => word[0])
            .join('')
            .toUpperCase();

        return initials;
    }

    const handleSeleting = () => {
        if (onSelecting) {
            onSelecting(patient);
        }
    }

    return(
        <div className={`btn ${styles.patientCard}`} onClick={handleSeleting}>
            <div className={styles.patientIcon} style={{ backgroundColor: patient.iconColor}}>{getInitials(patient.name)}</div>

            <div className={styles.infoContainer}>
                <p className={styles.name}>{patient.name}</p>
                <p>{patient.email}</p>
                <p>{patient.phone}</p>
            </div>
        </div>
    )
}