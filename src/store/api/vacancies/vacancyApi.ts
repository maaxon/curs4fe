// store/vacanciesApiSlice.js
import apiSlice from '../apiSlice';
import {UserVacancy, VacancyWithId} from "@type/types.ts";

const vacanciesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVacancies: builder.query<VacancyWithId[], void>({
            query: () => 'vacancies',
        }),
        getVacancyById: builder.query<VacancyWithId, string | undefined>({
            query: (id) => `vacancies/${id}`,
            providesTags:['GET_VACANCIES_BY_ID']
        }),
        getVacancyByUserId: builder.query<UserVacancy[], number | string | undefined>({
            query: (id) => `vacancies/user/${id}`,
            providesTags:['GET_VACANCIES_BY_USER_ID']
        }),
        removeVacancy: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `vacancies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['GET_VACANCIES_BY_USER_ID']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetVacanciesQuery,
    useGetVacancyByIdQuery,
    useGetVacancyByUserIdQuery,
    useRemoveVacancyMutation
} = vacanciesApiSlice;

