import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useNavigate, useParams} from "react-router-dom";
import {getUpdatingResumeData} from "../../store/reducers/UpdateResume/selectors/getResumeData.ts";
import {
    addUpdatingEducationCard,
    addUpdatingExperienceCard, addUpdatingSkillCard
} from "../../store/reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import UpdatingEducationCard from "@components/Updating/EducationCard/EducationCard.tsx";
import UpdatingExperienceCard from "@components/Updating/ExperienceCard/ExpirienceCard.tsx";
import UpdatingSkillCard from "@components/Updating/SkillCard/SkillCard.tsx";
import {fetchUpdatingResume} from "../../store/reducers/UpdateResume/thunk/fetchUpdatingResume.ts";
import UpdatingResumeHeading from "@pages/UpdateResume/Header.tsx";
import {ErrorMessage} from "@components/ErrorMessage";
import {toast} from "sonner";

const UpdateResume = () => {
    const {title, location, salary, description, skills, experience, education} = useAppSelector(getUpdatingResumeData)
    const user = useAppSelector(getUser)
    const {id: resumeId} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<null | boolean>(null)

    useEffect(() => {
        if (resumeId) dispatch(fetchUpdatingResume(resumeId))
    }, []);

    const addEducation = () => {
        dispatch(addUpdatingEducationCard())
    }

    const addExperience = () => {
        dispatch(addUpdatingExperienceCard())
    }

    const addSkill = () => {
        dispatch(addUpdatingSkillCard())
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError(null)
        try {
            e.preventDefault();
            await axios.put(`${process.env.BACK_URL}/resume/${resumeId}`, {
                title,
                description,
                salary,
                location,
                userId: user?.id,
                educations: education,
                experience,
                skills
            })
            navigate("/resumes")
            toast.success("Resume updated");
        } catch {
            setError(true)
        }
    }

    console.log(experience)
    console.log(skills)
    console.log(education)

    return (
        <form onSubmit={onSubmit}>
            {error && <ErrorMessage error="Error on updating resume"/>}
            <UpdatingResumeHeading/>
            <main>

                <section className=" bg-alt">
                    <div className="container">

                        <header className="section-header">
                            <span>Latest degrees</span>
                            <h2>Education</h2>
                        </header>

                        <div className="row d-flex justify-content-center">

                            {education.map((el, idx) =>
                                <UpdatingEducationCard id={el.id} data={el} idx={idx} key={el.id}/>
                            )}


                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addEducation}
                                        className="btn btn-primary btn-duplicator">Add
                                    education
                                </button>
                            </div>


                        </div>
                    </div>
                </section>

                <section>
                    <div className="container">
                        <header className="section-header">
                            <span>Past positions</span>
                            <h2>Work Experience</h2>
                        </header>

                        <div className="row d-flex justify-content-center">

                            {experience.map((el, idx) =>
                                <UpdatingExperienceCard id={el.id} data={el} idx={idx} key={el.id}/>
                            )}


                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addExperience}
                                        className="btn btn-primary btn-duplicator">Add
                                    experience
                                </button>
                            </div>


                        </div>

                    </div>
                </section>

                <section className=" bg-alt">
                    <div className="container">
                        <header className="section-header">
                            <span>Expertise Areas</span>
                            <h2>Skills</h2>
                        </header>

                        <div className="row">

                            {skills.map((el, idx) =>
                                <UpdatingSkillCard id={el.id} data={el} idx={idx} key={el.id}/>
                            )}

                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addSkill} className="btn btn-primary btn-duplicator">Add
                                    skill
                                </button>
                            </div>


                        </div>

                    </div>
                </section>

                <section className=" bg-img" style={{backgroundImage: "url(/bg-facts.jpg)"}}>
                    <div className="container">
                        <header className="section-header">
                            <span>Are you done?</span>
                            <h2>Submit resume</h2>
                            <p>Please review your information once more and press the below button to put your resume
                                online.</p>
                        </header>

                        <p className="text-center">
                            <button type="submit" className="btn btn-success btn-xl btn-round">Submit your resume
                            </button>
                        </p>

                    </div>
                </section>


            </main>
        </form>
    );
};

export default UpdateResume;
