import {createSlice} from "@reduxjs/toolkit";
import {fetchResumes} from "../thunk/fetchResumes.ts";
import {Resume, UserResume} from "../types/types.ts";
import {fetchUserResumes} from "../thunk/fetchUserResume.ts";
import {fetchResume} from "../thunk/fetchResume.ts";
import {FullResume} from "@type/types.ts";

type HomePageState = {
    resumes: Resume[];
    userResume:UserResume[];
    selectedResume?: FullResume;
    loading: boolean;
    error?: string;
};

const  initialState:HomePageState = {
    resumes: [],
    userResume:[],
    selectedResume: undefined,
    loading: false,
    error: undefined
}

export const ResumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumes.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchResumes.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = action.payload; // Сохраняем пользователей в состоянии
            })
            .addCase(fetchResumes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
        builder
            .addCase(fetchResume.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchResume.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedResume = action.payload; // Сохраняем пользователей в состоянии
            })
            .addCase(fetchResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
        builder
            .addCase(fetchUserResumes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserResumes.fulfilled, (state, action) => {
                state.loading = false;
                state.userResume = action.payload; // Заполняем резюме полученными данными
                state.error = '';
            })
            .addCase(fetchUserResumes.rejected, (state, action) => {
                state.loading = false;
                state.userResume = [];
                state.error = action.error.message; // Записываем ошибку
            });
    }
})



export default ResumeSlice.reducer
