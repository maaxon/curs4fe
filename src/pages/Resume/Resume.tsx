import {useParams} from "react-router-dom";
import {ResumePageHeader} from "@pages/Resume/Header.tsx";
import {useEffect} from "react";
import {fetchResume} from "../../store/reducers/Resume/thunk/fetchResume.ts";
import {useAppDispatch} from "@hooks/redux.ts";
import {useSelector} from "react-redux";
import {
    getEducation,
    getExperience,
    getResumeError,
    getSkills
} from "../../store/reducers/Resume/selectors/selector.ts";
import {ResumeEducationCard} from "@components/ResumeEducationCard";
import {ResumeExperienceCard} from "@components/ResumeExperienceCard";

export const Resume = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (id) dispatch(fetchResume(id))
    }, [id, dispatch]);

    const education = useSelector(getEducation)
    const skills = useSelector(getSkills)
    const experience = useSelector(getExperience)
    const error = useSelector(getResumeError)

    if (!id || error) return <h1>Not found</h1>

    return (
        <>
            <ResumePageHeader/>
            <main>
                <section>
                    <div className="container">

                        <header className="section-header">
                            <span>Latest degrees</span>
                            <h2>Education</h2>
                        </header>

                        <div className="row">
                            {education && education.map((el, idx) => <ResumeEducationCard education={el} key={idx}/>)}
                        </div>

                    </div>
                </section>

                <section className="bg-alt">
                    <div className="container">
                        <header className="section-header">
                            <span>Past positions</span>
                            <h2>Work Experience</h2>
                        </header>

                        <div className="row">
                            {experience && experience.map((el, idx) => <ResumeExperienceCard experience={el}
                                                                                             key={idx}/>)}
                        </div>

                    </div>
                </section>

                <section>
                    <div className="container">
                        <header className="section-header">
                            <span>Expertise Areas</span>
                            <h2>Skills</h2>
                        </header>

                        <br/>
                        <ul className="skills cols-3">

                            {skills && skills.map(({name, proficiencyLevel}, idx) =>
                                <li key={idx}>
                                    <div>
                                        <span className="skill-name">{name}</span>
                                        <span className="skill-value">{proficiencyLevel}%</span>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: `${proficiencyLevel}%`}}></div>
                                    </div>
                                </li>
                            )}
                        </ul>

                    </div>
                </section>

            </main>
        </>
    )
}
