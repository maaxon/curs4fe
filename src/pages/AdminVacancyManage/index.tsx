import {Header} from "@pages/ManageVacancies/header.tsx";
import {ManageVacancyCard} from "@components/Admin/ManageVacancyCard";
import {useGetAdminVacanciesQuery} from "../../store/api/admin/vacancies";

export const AdminManageVacancies = () => {

    const {data: vacancies} = useGetAdminVacanciesQuery()

    return (
        <>
            <Header/>
            <main>
                <section className="no-padding-top bg-alt">
                    <div className="container">
                        <div className="row">

                            <div className="col-xs-12 text-right">
                                <br/>
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
