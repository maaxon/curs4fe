import {useGetVacancyByIdQuery} from "../../store/api/vacancies/vacancyApi.ts";
import {useParams} from "react-router-dom";
import {HtmlParser} from "@components/html-parser";
import {RatingStars} from "@components/rating";
import {useAddUserResponseMutation} from "../../store/api/response/user";
import {useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useModalOpen} from "@hooks/use-modal-open/use-modal-open.ts";
import {SelectResumeModal} from "@components/select-resume-modal";
import {ErrorMessage} from "@components/ErrorMessage";
import {toast} from 'sonner';

export const VacancyPage = () => {
    const {id} = useParams<{ id: string }>();

    const user = useAppSelector(getUser);
    const {data: vacancy} = useGetVacancyByIdQuery(id)
    const [addResponse, {isError}] = useAddUserResponseMutation();

    const {isModalOpen, handleModalOpen, handleModalClose} = useModalOpen()


    if (!vacancy) return null;

    const {
        title,
        location,
        company_name,
        experience,
        job_type,
        description,
        degree,
        salary,
        short_description,
        working_hours,
        user_id,
        rating,
        tags
    } = vacancy;

    const onResponse = (resumeId?: number) => {
        try {
            addResponse({user_id: user?.id, vacancy_id: id, employer_id: user_id, resume_id: resumeId})
            handleModalClose()
            toast.success("Response successful");
        }
        catch{
            console.log("Error")
        }
    }


    return (
        <>
            <ErrorMessage error={isError ? "Failed to response" : null}/>
            <header className="page-header bg-img size-lg" style={{backgroundImage: "url(assets/img/bg-banner2.jpg)"}}>
                <div className="container">

                    <div className="header-detail">
                        <div className="d-flex justify-content-between">
                            <div className="hgroup">
                                <h1>{title}</h1>
                                <h3>{company_name}</h3>

                            </div>
                            <RatingStars rating={rating} owner_id={user_id} />
                        </div>
                        <hr />
                        <p className="lead">{short_description}</p>

                        <ul className="details cols-3">
                            <li>
                                <i className="fa fa-map-marker"></i>
                                <span>{location}</span>
                            </li>

                            <li>
                                <i className="fa fa-briefcase"></i>
                                <span>{job_type}</span>
                            </li>

                            <li>
                                <i className="fa fa-money"></i>
                                <span>{salary} / hour</span>
                            </li>

                            <li>
                                <i className="fa fa-clock-o"></i>
                                <span>{working_hours}h / week</span>
                            </li>

                            <li>
                                <i className="fa fa-flask"></i>
                                <span>{experience} years experience</span>
                            </li>

                            <li>
                                <i className="fa fa-certificate"></i>
                                <span>{degree}</span>
                            </li>
                        </ul>
                        <div className="tag-list">
                            <h6>Avilablebilities</h6>
                            {tags.map(tag => (<span>{tag.toUpperCase()}</span>))}
                        </div>
                    </div>
                    <div className="button-group">
                        <div className="action-buttons">
                            {user?.role === 'user' &&
                              <span className="btn btn-success" onClick={handleModalOpen}>Apply now</span>}
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section>
                    <div className="container">
                        <HtmlParser html={description}/>
                    </div>
                </section>
            </main>
            <SelectResumeModal handleModalClose={handleModalClose} isModalOpen={isModalOpen} onResponse={onResponse}/>
        </>
    )
}
