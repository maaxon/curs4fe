// store/vacanciesApiSlice.js
import apiSlice from '../../apiSlice';
import {UserResponse, Response} from "@type/types.ts";

const userResponseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserResponses: builder.query<UserResponse[], number | undefined>({
            query: (id) => `response/user/${id}`,
            providesTags:['GET_USER_RESPONSES']
        }),
        addUserResponse: builder.mutation<void, Partial<Response>>({
            query: (response) => ({
                url: `/response`,
                method: 'POST',
                body: response
            }),
            invalidatesTags:['GET_USER_RESPONSES']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useAddUserResponseMutation,
    useGetUserResponsesQuery
} = userResponseApiSlice;

