import {Header} from "@pages/ManageVacancies/header.tsx";
import {useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useGetVacancyByUserIdQuery} from "../../store/api/vacancies/vacancyApi.ts";
import {ManageVacancyCard} from "@components/ManageVacancyCard";
import {Link} from "react-router-dom";

export const ManageVacancies = () => {

    const user = useAppSelector(getUser);
    console.log(user)
    const {data: vacancies} = useGetVacancyByUserIdQuery(user?.id)

    console.log(vacancies)

    return (
        <>
            <Header/>
            <main>
                <section className="no-padding-top bg-alt">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 text-right">
                                <br/>
                                <Link className="btn btn-primary btn-sm" to={`/create-vacancy`}>Add new job</Link>
                            </div>
                            {vacancies && vacancies.map((vacancy) => <ManageVacancyCard vacancy={vacancy}
                                                                                        key={vacancy.id}/>)}

                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
