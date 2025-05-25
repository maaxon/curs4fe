import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchResume = createAsyncThunk(
    'resumes/fetchResume',
    async (id: string) => {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/resume/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }
);
