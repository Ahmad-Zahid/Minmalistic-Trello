import { GET_LOCAL_USERS, GET_USERS, GET_USERS_SUCCESS } from "./actionTypes";

export const getUsers = () => ({
    type: GET_USERS,
});

export const getLocalUsers = () => ({
    type: GET_LOCAL_USERS,
});

export const getUsersSuccess = (payload: any) => ({
    type: GET_USERS_SUCCESS,
    payload,
});
