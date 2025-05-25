import {UserVacancy} from "@type/types.ts";
import {Link} from "react-router-dom";
import {useBlockVacancyMutation, usePublishVacancyMutation} from "../../../store/api/admin/vacancies";

interface ManageVacancyCardProps {
    vacancy: UserVacancy
}

export const ManageVacancyCard = ({vacancy: {id, title, company_name, location}}: ManageVacancyCardProps) => {

    const [publishVacancy] = usePublishVacancyMutation()
    const [blockVacancy] = useBlockVacancyMutation()

    const onPublish = () =>{
        publishVacancy(id)
    }

    const onBlock = () =>{
        blockVacancy(id)
    }


    return (
        <div className="col-xs-12">

            <div className="item-block">
                <Link to={`/admin/vacancy/${id}`}>
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
                    <div className="action-btn d-flex justify-content-between" style={{minWidth: 165}}>
                        <span className="btn btn-xs btn-primary" onClick={onPublish}>Publish</span>
                        <span className="btn btn-xs btn-danger" onClick={onBlock}>Block</span>
                    </div>
                </footer>
            </div>

        </div>
    )
}
