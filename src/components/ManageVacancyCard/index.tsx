import {UserVacancy} from "@type/types.ts";
import {Link} from "react-router-dom";
import {useRemoveVacancyMutation} from "../../store/api/vacancies/vacancyApi.ts";

interface ManageVacancyCardProps {
    vacancy: UserVacancy
}

export const ManageVacancyCard = ({vacancy: {id, title, company_name, location,status}}: ManageVacancyCardProps) => {

    const [removeVacancyMutation] = useRemoveVacancyMutation();

    const removeVacancy = async () => {
        await removeVacancyMutation(id);
    }

    return (
        <div className="col-xs-12">

            <div className="item-block">
                <Link to={`/view/vacancy/${id}`}>
                    <header>

                        <div className="hgroup">
                            <h4>{title}</h4>
                            <h5>{company_name}</h5>
                        </div>
                        <div className="header-meta">
                            <span className="location">{location}</span>
                        </div>
                    </header>
                </Link>
                <footer>
                    <p className="status"><strong>Status:</strong> {status}</p>

                    <div className="action-btn">
                        <Link  className="btn btn-xs btn-gray" to={`/update-vacancy/${id}`}>Edit</Link>
                        <span onClick={removeVacancy} className="btn btn-xs btn-danger">Delete</span>
                    </div>
                </footer>
            </div>

        </div>
    )
}
