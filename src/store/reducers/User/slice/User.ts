import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunk/fetchUsers.ts";
import {User} from "../types/types.ts";
import {loginUser} from "../thunk/login.ts";
import {getStorage, setStorage} from "@utils/storage";

type HomePageState = {
    users: User[];
    user?: User;
    loading: boolean;
    error?: string;
};

const initialState: HomePageState = {
    users: [],
    user: undefined,
    loading: false,
    error: undefined
}

export const UserSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        init(state: HomePageState) {
            state.user = getStorage("user");
        },
        logout(state: HomePageState) {
            localStorage.removeItem("user");
            state.user = undefined;
        },
        changeName(state: HomePageState,{payload}: PayloadAction<string>) {
            if (state.user){
                state.user.name = payload;
                setStorage("user", state.user);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Сохраняем пользователей в состоянии
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                setStorage<User>('user',action.payload)
                state.loading = false;
                state.user = action.payload;
                state.error = undefined;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Сохраняем ошибку
            });
    }
})

export const {init,logout,changeName} = UserSlice.actions;

export default UserSlice.reducer
