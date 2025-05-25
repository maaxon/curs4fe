import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Header} from "./header.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {getUpdatingVacancy} from "../../store/reducers/UpdateVacancy/selector/getUpdatingVacancy.ts";
import {fetchUpdatingVacancy} from "../../store/reducers/UpdateVacancy/thunk/thunk.ts";
import {setUpdatingField} from "../../store/reducers/UpdateVacancy/slice/slice.ts";
import apiSlice from "../../store/api/apiSlice.ts";
import {toast} from "sonner";


export const UpdateVacancy = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {vacancy, loading, error} = useAppSelector(getUpdatingVacancy);

    useEffect(() => {
        if (id) dispatch(fetchUpdatingVacancy(id));
    }, [id]);

    const navigate = useNavigate();

    const onChange = (data: string) => {
        dispatch(setUpdatingField({name: "description", value: data}))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACK_URL}/vacancies/${id}`, {
                ...vacancy
            })
            dispatch(apiSlice.util.invalidateTags(['GET_VACANCIES_BY_USER_ID']));
            navigate('/')

            toast.success("Vacancy updated");
        }catch{
            toast.error("Error on update vacancy");
        }

    }

    if (loading && !vacancy) return <p>Loading...</p>;
    if (!loading && !vacancy && error) return <p>Error!</p>;

    if (vacancy) {
        const {description} = vacancy

        return (
            <>
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
}
