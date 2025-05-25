import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserSlice from "./reducers/User/slice/User.ts";
import FilterForm from "./reducers/FilterForm/slice/FilterForm.ts";
import CreateResumeSlice from "./reducers/CreateResume/slice/CreateResumeSlice.ts";
import ResumeSlice from "./reducers/Resume/slice/Resume.ts";
import UpdateResumeSlice from "./reducers/UpdateResume/slice/UpdateResumeSlice.ts";
import CreateVacancySlice from "./reducers/CreateVacancy/slice/createVacancy.ts";
import apiSlice from "./api/apiSlice.ts";
import UpdateVacancySlice from "./reducers/UpdateVacancy/slice/slice.ts";


const rootReducer = combineReducers({
    users: UserSlice,
    filterForm: FilterForm,
    resume: ResumeSlice,
    createResume: CreateResumeSlice,
    updateResume: UpdateResumeSlice,
    createVacancy: CreateVacancySlice,
    updateVacancy: UpdateVacancySlice,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
