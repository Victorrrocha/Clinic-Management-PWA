import styles from './PatientCard.module.css'

export interface Patient {
    id: string,
    name: string,
    email: string,
    phone: string,
    iconColor: string
}

export function PatientCard({patient}: { patient: Patient}) {

    const getInitials = (name: string): string => {
        const initials = name
            .split(' ')
            .map((word: string) => word[0])
            .join('')
            .toUpperCase();

        return initials;
    }

    return(
        <div className={`btn ${styles.patientCard}`}>
            <div className={styles.patientIcon} style={{ backgroundColor: patient.iconColor}}>{getInitials(patient.name)}</div>

            <div className={styles.infoContainer}>
                <p className={styles.name}>{patient.name}</p>
                <p>{patient.email}</p>
                <p>{patient.phone}</p>
            </div>
        </div>
    )
}