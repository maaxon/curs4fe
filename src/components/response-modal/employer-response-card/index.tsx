import { Link } from "react-router-dom";
import { EmployerResponse } from "@type/types.ts";
import { useAcceptResponseMutation, useRejectResponseMutation } from "../../../store/api/response/employer";
import { toast } from 'sonner';

interface Props {
    response: EmployerResponse;
}

export const EmployerResponseCard = ({ response: { id, vacancy_title, vacancy_id, status, resume_id, resume_title } }: Props) => {

    const [acceptResponse] = useAcceptResponseMutation();
    const [rejectResponse] = useRejectResponseMutation();

    const onAccept = () => {
        acceptResponse(id).then(() => {
            toast.success('Response accepted!');
        }).catch(() => {
            toast.error('Failed to accept response.');
        });
    };

    const onReject = () => {
        rejectResponse(id).then(() => {
            toast.success('Response rejected!');
        }).catch(() => {
            toast.error('Failed to reject response.');
        });
    };

    if (!resume_id || !vacancy_id) return null;

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">
                    Vacancy: <Link to={`/vacancy/${vacancy_id}`} className="text-decoration-none">{vacancy_title}</Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    Resume: <Link to={`/resume/${resume_id}`} className="text-decoration-none">{resume_title}</Link>
                </h6>
                <p className="card-text">Status: <strong>{status}</strong></p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={onAccept}>Accept</button>
                    <button className="btn btn-danger" onClick={onReject}>Reject</button>
                </div>
            </div>
        </div>
    );
};
