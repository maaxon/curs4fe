import {VacancyWithId} from "@type/types.ts";
import {Link} from "react-router-dom";

interface VacancyCardProps{
    vacancy: VacancyWithId
}

export const VacancyCard = ({vacancy:{title,location,salary,short_description,job_type,id,degree, company_name}}:VacancyCardProps) =>{
    return (
        <div className="col-xs-12">
            <Link className="item-block" to={`/vacancy/${id}`}>
                <header>
                    <div className="hgroup">
                        <h4>{title}</h4>
                        <h5>{company_name} <span className="label label-success">{job_type}</span></h5>
                    </div>
                </header>

                <div className="item-body">
                    <p>{short_description}</p>
                </div>

                <footer>
                    <ul className="details cols-3">
                        <li>
                            <i className="fa fa-map-marker"></i>
                            <span>{location}</span>
                        </li>

                        <li>
                            <i className="fa fa-money"></i>
                            <span>{salary} / hour</span>
                        </li>

                        <li>
                            <i className="fa fa-certificate"></i>
                            <span>{degree}</span>
                        </li>
                    </ul>
                </footer>
            </Link>
        </div>
    )
}