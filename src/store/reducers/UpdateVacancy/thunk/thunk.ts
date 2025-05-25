import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUpdatingVacancy = createAsyncThunk(
    'resume/fetchUpdatingResume',
    async (id: string) => {
        const response = await fetch(`${process.env.BACK_URL}/vacancies/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }
);
