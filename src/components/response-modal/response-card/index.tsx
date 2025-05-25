import {Link} from "react-router-dom";
import {UserResponse} from "@type/types.ts";
import styles from "./style.module.css";

interface Props {
    response: UserResponse;
}

export const ResponseCard = ({response: {vacancy_title, vacancy_id, status, resume_title, resume_id}}: Props) => {

    // Определяем класс для цвета статуса
    const statusClass = status === "Rejected" ? "text-danger" : status === "Accepted" ? "text-success" : "";
    if (!resume_id || !vacancy_id) return null;
    return (
        <div className={`card mb-3 ${styles.wrapper}`}>
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/vacancy/${vacancy_id}`} className="text-decoration-none">{vacancy_title}</Link>
                </h5>
                <p className={`card-text`}>Status: <strong className={statusClass}>{status}</strong></p>
                <p className="card-text">Resume: <Link to={`/resume/${resume_id}`}
                                                       className="text-decoration-none">{resume_title}</Link></p>
            </div>
        </div>
    );
}
