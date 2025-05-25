import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUpdatingResume = createAsyncThunk(
    'resume/fetchUpdatingResume',
    async (id: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/resume/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }
);
