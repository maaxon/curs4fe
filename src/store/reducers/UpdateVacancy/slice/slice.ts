import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUpdatingVacancy } from '../thunk/thunk.ts';
import {VacancyWithId} from "@type/types.ts"; // Импортируйте ваш thunk

type CreateVacancyState = {
    vacancy: VacancyWithId | undefined;
    loading: boolean;
    error?: string;
};


const initialState: CreateVacancyState = {
    vacancy: undefined,
    loading: false,
    error: undefined
};

export const UpdateVacancySlice = createSlice({
    name: 'vacancy',
    initialState,
    reducers: {
        setUpdatingField(state, { payload }: PayloadAction<{ name: string, value: string }>) {
            // @ts-ignore
            state.vacancy[payload.name] = payload.value;
        },
        setUpdatingTag(state, { payload }: PayloadAction<{ checked: boolean, value: string }>) {

            if (state.vacancy){
                state.vacancy.tags = state.vacancy.tags = payload.checked ? [...state.vacancy.tags, payload.value]
                  : state.vacancy.tags.filter(tag => tag !== payload.value);
            }

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdatingVacancy.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUpdatingVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancy = action.payload; // Сохраняем вакансию в состоянии
            })
            .addCase(fetchUpdatingVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
    }
});

export const {
    setUpdatingField,
  setUpdatingTag
} = UpdateVacancySlice.actions;

export default UpdateVacancySlice.reducer;
