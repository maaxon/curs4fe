import {VacancyWithId} from "@type/types.ts";
import {FilterFormState} from "../../../store/reducers/FilterForm/slice/FilterForm.ts";

export function filterVacancies(vacancies: VacancyWithId[],{keyword,experience,contract,location,hour_rate,degree, tags}: FilterFormState) {
    return vacancies.filter(vacancies => {
        if (keyword && !vacancies.title.toLowerCase().includes(keyword.toLowerCase())) return false;
        if (experience && vacancies.experience < experience) return false;
        if (hour_rate && vacancies.salary < hour_rate) return false;
        if (contract && !vacancies.job_type.includes(contract)) return false;
        if (location && !vacancies.location.includes(location)) return false;
        if (degree && !vacancies.degree.includes(degree)) return false;
        if (tags && !tags.every(element => vacancies.tags.includes(element))) return false;
        return true
    })
}
