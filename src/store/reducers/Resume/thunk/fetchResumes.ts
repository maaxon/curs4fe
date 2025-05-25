import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchResumes = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${import.meta.env.VITE_BACK_URL}/resume`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json(); // Возвращаем полученные данные
});
