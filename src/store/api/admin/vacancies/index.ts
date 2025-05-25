import apiSlice from '../../apiSlice';
import {UserVacancy} from "@type/types.ts";

const adminVacancyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminVacancies: builder.query<UserVacancy[], void>({
            query: () => 'admin/vacancies',
            providesTags:['GET_ADMIN_VACANCIES']
        }),
        getVacancyById: builder.query<UserVacancy, string | undefined>({
            query: (id) => `vacancies/${id}`,
        }),
        publishVacancy: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `admin/vacancies/publish/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['GET_ADMIN_VACANCIES']
        }),
        blockVacancy: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `admin/vacancies/block/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['GET_ADMIN_VACANCIES']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetAdminVacanciesQuery,
    useGetVacancyByIdQuery,
    useBlockVacancyMutation,
    usePublishVacancyMutation
} = adminVacancyApiSlice;

