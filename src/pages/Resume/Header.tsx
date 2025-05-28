import avatar from '@assets/img/avatar.jpg'
import {useSelector} from "react-redux";
import {getResume} from "../../store/reducers/Resume/selectors/selector.ts";

export const ResumePageHeader = () => {

    const resume = useSelector(getResume)

    if (resume){

    console.log(resume)

    const {title,description,salary,location,user, image} = resume

    return (
        <header className="page-header bg-img" style={{backgroundImage: "url(bg-banner1.jpg)"}}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <img src={image ? image : avatar} height={250} style={{marginLeft:50}} alt=""/>
                    </div>

                    <div className="col-xs-12 col-sm-8 header-detail">
                        <div className="hgroup">
                            <h1>{title}</h1>
                            <h3>Name: {user?.name}</h3>
                            <h3>Email: {user?.email}</h3>
                        </div>
                        <hr/>
                        <p className="lead">
                            {description}
                        </p>

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
                    </div>
                </div>

            </div>
        </header>
    )
    }

    return null
}
