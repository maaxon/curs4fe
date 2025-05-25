import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Header} from "@pages/createVacancy/header.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {getVacancyData} from "../../store/reducers/CreateVacancy/selectors/getVacancyData.ts";
import {setField} from "../../store/reducers/CreateVacancy/slice/createVacancy.ts";
import React from "react";
import axios from "axios";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "@components/ErrorMessage";
import {toast} from "sonner";


export const CreateVacancy = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(getVacancyData);
    const {description} = data;
    const user = useAppSelector(getUser)
    const navigate = useNavigate();

    const [error, setError] = React.useState(false);

    const onChange = (data: string) => {
        dispatch(setField({name: "description", value: data}))
    }

    const onSubmit = async (e: React.FormEvent) => {
        setError(false)
        e.preventDefault();
        try {
            await axios.post(`${process.env.BACK_URL}/vacancies`, {
                ...data,
                user_id: user?.id
            })
            setError(false);
            navigate('/')

            toast.success("Vacancy created");
        } catch {
            setError(true)
        }
    }

    return (
        <>
            {error && <ErrorMessage error={"Failed to create vacancy"}/>}
            <Header/>
            <main>

                <section>
                    <div className="container">

                        <header className="section-header">
                            <span>Description</span>
                            <h2>Job detail</h2>
                            <p>Write about your company, job description, skills required, benefits, etc.</p>
                        </header>

                        <ReactQuill value={description} onChange={onChange} theme="snow"/>
                    </div>
                </section>
                <section className="bg-alt">
                    <div className="container">
                        <header className="section-header">
                            <span>Are you done?</span>
                            <h2>Submit Job</h2>
                            <p>Please review your information once more and press the below button to put your job
                                online.</p>
                        </header>

                        <p className="text-center">
                            <button onClick={onSubmit} className="btn btn-success btn-xl btn-round">Submit your job
                            </button>
                        </p>

                    </div>
                </section>


            </main>
        </>
    );
}
