import {RootState} from "../../../store.ts";

export const getUsers = (state: RootState) => state.users.users;
export const getUser = (state: RootState) => state.users.user;
export const getUserLoading = (state: RootState) => state.users.loading;
export const getUserError = (state: RootState) => state.users.error;