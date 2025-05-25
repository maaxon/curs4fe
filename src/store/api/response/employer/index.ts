// store/vacanciesApiSlice.js
import apiSlice from '../../apiSlice';
import {EmployerResponse} from "@type/types.ts";

const userResponseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEmployerResponses: builder.query<EmployerResponse[], number | undefined>({
            query: (id) => `response/employer/${id}`,
            providesTags:['GET_EMPLOYER_RESPONSES']
        }),
        acceptResponse: builder.mutation<void, number | undefined>({
            query: (id) => ({
                url: `/response/accept/${id}`,
                method: 'PUT',
            }),
            invalidatesTags:['GET_EMPLOYER_RESPONSES']
        }),
        rejectResponse: builder.mutation<void, number | undefined>({
            query: (id) => ({
                url: `/response/reject/${id}`,
                method: 'PUT',
            }),
            invalidatesTags:['GET_EMPLOYER_RESPONSES']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetEmployerResponsesQuery,
    useAcceptResponseMutation,
    useRejectResponseMutation
} = userResponseApiSlice;

