import {useGetVacanciesQuery} from "../../store/api/vacancies/vacancyApi.ts";
import {Header} from "@pages/Vacancies/header.tsx";
import {VacancyCard} from "@components/VacancyCard";
import {filterVacancies} from "@pages/Vacancies/utils/helpers.ts";
import {useAppSelector} from "@hooks/redux.ts";
import {getFilterForm} from "../../store/reducers/FilterForm/selectors/getFormData.ts";

export const VacanciesPage = () => {
    const {data: vacancies} = useGetVacanciesQuery();
    const filters= useAppSelector(getFilterForm)
    console.log(filters)

    if (!vacancies) {
        return <div>Loading...</div>;
    }

    const filteredVacancies = filterVacancies(vacancies, filters);
    console.log(filteredVacancies)
    return (<>
        <Header/>
        <main>
            <section className="no-padding-top bg-alt">
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12">
                            <br/>
                            {filteredVacancies && filteredVacancies.length > 0 ? <h5>We found {filteredVacancies.length} vacancies</h5> :
                                <h5>Cant found vacancies</h5>}
                        </div>

                        {filteredVacancies.map((vacancy) => <VacancyCard key={vacancy.id} vacancy={vacancy}/>)}

                    </div>

                </div>
            </section>
        </main>
    </>)
}
