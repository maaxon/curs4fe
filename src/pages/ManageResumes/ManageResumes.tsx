import ManageResumesHeader from "@pages/ManageResumes/ManageResumesHeader.tsx";
import ResumeControllCard from "@components/ResumeControllCard/ResumeControllCard.tsx";
import {useEffect} from "react";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {fetchUserResumes} from "../../store/reducers/Resume/thunk/fetchUserResume.ts";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {getUserResumes} from "../../store/reducers/Resume/selectors/selector.ts";
import {Link} from "react-router-dom";

const ManageResumes = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser)!
    useEffect(() => {
        if (user) dispatch(fetchUserResumes(user.id))
    }, [user, dispatch]);

    const userResumes = useAppSelector(getUserResumes)

    if (!user) return <h1>Not found</h1>

    return (
        <>
            <ManageResumesHeader/>
            <main>
                <section className="no-padding-top bg-alt">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 text-right">
                                <br/>
                                <Link to={'/favorites'} className="btn btn-primary btn-sm">Add new resume</Link>
                            </div>
                            {userResumes.map(({id, image, location, title, salary, status,}) =>
                                <ResumeControllCard key={id} id={id} image={image} location={location} title={title} salary={salary}
                                                    name={user.name} status={status}/>)}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );


};

export default ManageResumes
