import apiSlice from '../../apiSlice';
import {UserResume} from "../../../reducers/Resume/types/types.ts";

const adminResumeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAdminResumes: builder.query<UserResume[], void>({
            query: () => 'admin/resume',
            providesTags:['GET_ADMIN_RESUMES']
        }),
        getResumeById: builder.query<UserResume, string | undefined>({
            query: (id) => `resume/${id}`,
        }),
        publishResume: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `admin/resume/publish/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['GET_ADMIN_RESUMES']
        }),
        blockResume: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `admin/resume/block/${id}`,
                method: 'POST',
            }),
            invalidatesTags:['GET_ADMIN_RESUMES']
        }),
    }),
    overrideExisting: false,
});

// Экспортируйте хуки для использования в компонентах
export const {
    useGetAdminResumesQuery,
    useGetResumeByIdQuery,
    usePublishResumeMutation,
    useBlockResumeMutation
} = adminResumeApiSlice;

