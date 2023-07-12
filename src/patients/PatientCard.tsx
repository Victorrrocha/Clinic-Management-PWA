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

        return initials[0] + initials[initials.length - 1];
    }

    const handleSeleting = () => {
        if (onSelecting) {
            onSelecting(patient);
        }
    }

    return(
        <div className={`card ${styles.patientCard}`} onClick={handleSeleting}>
            <div className={styles.patientIcon} style={{ backgroundColor: patient.iconColor}}>{getInitials(patient.name)}</div>

            <div className={styles.infoContainer}>
                <p className={styles.name}>{patient.name}</p>
            </div>
        </div>
    )
}