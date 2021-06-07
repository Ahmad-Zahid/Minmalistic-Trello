import { GET_USERS, GET_USERS_SUCCESS } from "./actionTypes";

export const getUsers = () => ({
    type: GET_USERS,
});

export const getUsersSuccess = (payload: any) => ({
    type: GET_USERS_SUCCESS,
    payload,
});
