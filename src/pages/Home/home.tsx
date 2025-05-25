import 'font-awesome/css/font-awesome.min.css';
import HomeHeader from "@pages/Home/HomeHeader.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import ResumeCard from "@components/ResumeCard/ResumeCard.tsx";
import {useEffect} from "react";
import {fetchResumes} from "../../store/reducers/Resume/thunk/fetchResumes.ts";
import {getResumes} from "../../store/reducers/Resume/selectors/selector.ts";

const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchResumes())
    }, []);

    const resumes = useAppSelector(getResumes);

    return (
        <>
            <HomeHeader/>
            <main>
                <section className="no-padding-top">
                    <div className="container">


                        <div className="col-xs-12">
                            <br/>
                            {resumes && resumes.length > 0 ? <h5>We found resumes</h5> :
                                <h5>Cant found resumes</h5>}
                        </div>


                        <div className="row">
                            {resumes.map(({id, image, title, description, location, salary, user: {name}}) =>
                                <ResumeCard key={id}
                                            id={id}
                                            image={image}
                                            name={name}
                                            title={title}
                                            description={description}
                                            location={location ?? ""}
                                            salary={salary ?? ""}
                                />)}
                        </div>

                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
