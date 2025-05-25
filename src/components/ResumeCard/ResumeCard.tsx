import avatar from "@assets/img/avatar.jpg";
import {Link} from "react-router-dom";

interface ResumeCardProps {
    id: number,
    title: string;
    name: string;
    description: string;
    location: string;
    salary: number | string;
    image?: string
}

const ResumeCard = ({id, name, title, description, location, salary, image}: ResumeCardProps) => {
    return (
            <div className="col-sm-12 col-md-6">
                <Link to={`/resume/${id}`} className="item-block">
                    <header>
                        <img className="resume-avatar" src={image ? image : avatar} alt=""/>
                        <div className="hgroup">
                            <h4>{title}</h4>
                            <h5>{name}</h5>
                        </div>
                    </header>

                    <div className="item-body">
                        <p>I{description}</p>

                        <div className="tag-list">
                            <span>J2EE</span>
                            <span>J2SE</span>
                            <span>Android</span>
                        </div>
                    </div>

                    <footer>
                        <ul className="details cols-2">
                            <li>
                                <i className="fa fa-map-marker"></i>
                                <span>{location}</span>
                            </li>

                            <li>
                                <i className="fa fa-money"></i>
                                <span>${salary} / hour</span>
                            </li>
                        </ul>
                    </footer>
                </Link>
            </div>
    )
}

export default ResumeCard
