import avatar from "@assets/img/avatar.jpg";
import axios from "axios";
import {useSelector} from "react-redux";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {fetchUserResumes} from "../../store/reducers/Resume/thunk/fetchUserResume.ts";
import {useAppDispatch} from "@hooks/redux.ts";
import {Link} from "react-router-dom";

interface ResumeControlCardProps {
    id: number
    title: string;
    location? :string | null,
    salary?: number | null,
    name: string,
    status: string
    image?: string
}

const ResumeControlCard = ({id,title,location,salary,name,status, image}:ResumeControlCardProps) => {
    const {id: userId} = useSelector(getUser)!
    const dispatch = useAppDispatch();

    const onResumeDelete =  (id: number) => async () =>{
        await axios.delete(`${process.env.BACK_URL}/resume/${id}`)
        dispatch(fetchUserResumes(userId))
    }

    return(
        <div className="col-xs-12">
            <div className="item-block">
                <Link to={`/view/resume/${id}`}>
                <header>
                    <img className="resume-avatar" src={image ? image : avatar} alt=""/>
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
                    <p className="status"><strong>Status:</strong> {status}</p>

                    <div className="action-btn d-flex justify-content-between" style={{minWidth:135}}>
                        <Link className="btn btn-xs btn-gray" to={`/update-resume/${id}`}>Edit</Link>
                        <span className="btn btn-xs btn-danger" onClick={onResumeDelete(id)}>Delete</span>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ResumeControlCard;
