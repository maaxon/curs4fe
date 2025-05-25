// store/vacanciesApiSlice.js
import apiSlice from '../apiSlice';
import {Rate} from "@type/types.ts";

const rateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserRate: builder.query<number, {owner:number,user?:number}>({
            query: ({owner,user}) => `rate?user_id=${owner}&rated_by_user_id=${user}`,
            providesTags:['GET_RATE']
        }),
        rateUser: builder.mutation<void, Rate>({
            query: ({rate,owner,user}) => ({
                url: `rate`,
                method: 'POST',
                body: {
                    rate,
                    user_id: owner,
                    rated_by_user_id:user
                }
            }),
            invalidatesTags:['GET_RATE','GET_VACANCIES_BY_ID']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetUserRateQuery,
    useRateUserMutation
} = rateApiSlice;

