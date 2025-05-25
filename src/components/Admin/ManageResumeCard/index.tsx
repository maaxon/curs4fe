import avatar from "@assets/img/avatar.jpg";
import {useBlockResumeMutation, usePublishResumeMutation} from "../../../store/api/admin/resumes";
import {Link} from "react-router-dom";

interface ResumeControlCardProps {
    id: number
    title: string;
    location? :string | null,
    salary?: number | null,
    name: string,
}

const ManageResumeCard = ({id,title,location,salary,name}:ResumeControlCardProps) => {
    const [publishResume] = usePublishResumeMutation()
    const [blockResume] = useBlockResumeMutation()

    const onPublish = () =>{
        publishResume(id)
    }

    const onBlock = () =>{
        blockResume(id)
    }

    return(
        <div className="col-xs-12">
            <div className="item-block">
                <Link to={`/admin/resume/${id}`}>
                <header>
                    <img className="resume-avatar" src={avatar} alt=""/>
                    <div className="hgroup">
                        <h4>{name}</h4>
                        <h5>{title}</h5>
                    </div>
                    <div className="header-meta">
                        <span className="location">{location}</span>
                        <span className="rate">{salary} per hour</span>
                    </div>
                </header>
                </Link>
                <footer>
                    <div className="action-btn d-flex justify-content-between" style={{minWidth: 135}}>
                        <span className="btn btn-xs btn-primary" onClick={onPublish}>Publish</span>
                        <span className="btn btn-xs btn-danger" onClick={onBlock}>Block</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ManageResumeCard;
