import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch(`${import.meta.env.VITE_VITE_BACK_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json(); // Возвращаем полученные данные
});
