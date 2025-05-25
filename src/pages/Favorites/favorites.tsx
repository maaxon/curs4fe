import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {
    getEducationCardData,
    getExperienceCardData, getResumeData, getSkillCardData
} from "../../store/reducers/CreateResume/selectors/getResumeData.ts";
import EducationCard from "@components/EducationCard/EducationCard.tsx";
import {
    addEducationCard,
    addExperienceCard,
    addSkillCard, clearFields
} from "../../store/reducers/CreateResume/slice/CreateResumeSlice.ts";
import ExpirienceCard from "@components/ExperienceCard/ExpirienceCard.tsx";
import SkillCard from "@components/SkillCard/SkillCard.tsx";
import ResumeHeading from "@components/CreateResumeForm/ResumeHeading/ResumeHeading.tsx";
import React from "react";
import axios from "axios";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "@components/ErrorMessage";
import {uploadFile} from "@utils/firebase";
import {toast} from "sonner";

const Favorites = () => {
    const education = useAppSelector(getEducationCardData);
    const experience = useAppSelector(getExperienceCardData);
    const skills = useAppSelector(getSkillCardData);
    const {headline, location, salary, description, image} = useAppSelector(getResumeData)
    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [error, setError] = React.useState(false);

    const addEducation = () => {
        dispatch(addEducationCard())
    }

    const addExperience = () => {
        dispatch(addExperienceCard())
    }

    const addSkill = () => {
        dispatch(addSkillCard())
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false)

        try {
            const imageUrl = image ? await uploadFile('avatars',image) : 'https://firebasestorage.googleapis.com/v0/b/modsen-tweeter.appspot.com/o/avatars%2Favatar.jpg?alt=media&token=473a3ba7-2ad3-41dc-a5b9-916fe938ec34'

            if (user) {
                console.log(user.id)
                await axios.post(`${import.meta.env.VITE_BACK_URL}/resume`, {
                    title: headline,
                    image: imageUrl,
                    description,
                    salary,
                    location,
                    userId: user.id,
                    educations: education,
                    experience,
                    skills
                })
            }
            navigate("/resumes")
            toast.success("Resume created");
            dispatch(clearFields())
        }catch{
            setError(true)
        }
    }


    return (
        <form onSubmit={onSubmit}>
            {error && <ErrorMessage error={"Error on creating resume"}/>}
            <ResumeHeading/>
            <main>

                <section className=" bg-alt">
                    <div className="container">

                        <header className="section-header">
                            <span>Latest degrees</span>
                            <h2>Education</h2>
                        </header>

                        <div className="row d-flex justify-content-center">

                            {education.map((el, idx) =>
                                <EducationCard data={el} idx={idx} key={idx}/>
                            )}


                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addEducation} className="btn btn-primary btn-duplicator">Add
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

                        <div className="row row d-flex justify-content-center">

                            {experience.map((el, idx) =>
                                <ExpirienceCard data={el} idx={idx} key={idx}/>
                            )}


                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addExperience} className="btn btn-primary btn-duplicator">Add
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
                                <SkillCard data={el} idx={idx} key={idx}/>
                            )}

                            <div className="col-xs-12 text-center">
                                <br/>
                                <button type="button" onClick={addSkill} className="btn btn-primary btn-duplicator">Add skill</button>
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

export default Favorites;
