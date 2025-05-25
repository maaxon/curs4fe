import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchResumes = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${process.env.BACK_URL}/resume`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json(); // Возвращаем полученные данные
});
