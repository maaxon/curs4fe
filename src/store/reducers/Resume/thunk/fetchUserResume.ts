import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUserResumes = createAsyncThunk(
    'resumes/fetchUserResumes',
    async (userId: number) => {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/resume/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }
);
