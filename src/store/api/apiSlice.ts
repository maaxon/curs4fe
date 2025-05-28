import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACK_URL}`, // Ваш базовый URL
});

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes:['GET_VACANCIES_BY_USER_ID','GET_ADMIN_RESUMES','GET_ADMIN_VACANCIES','GET_RATE','GET_USER_RESPONSES','GET_EMPLOYER_RESPONSES','GET_VACANCIES_BY_ID'],
    baseQuery,
    endpoints: () => ({}), // Изначально пустой объект
    keepUnusedDataFor: 50,
});

// Экспортируйте сам apiSlice для использования в Store
export default apiSlice;
