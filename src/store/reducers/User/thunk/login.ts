import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData {
    email: string;
    password: string;
    loggedByGoogle?: boolean
}

export const loginUser = createAsyncThunk('users/login', async ({email, password, loggedByGoogle}: LoginData) => {

    const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/users/login`, {
        email,
        password,
    });
    return {...response.data, loggedByGoogle};

});
