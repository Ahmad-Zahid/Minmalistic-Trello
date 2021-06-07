import { GET_USERS_SUCCESS, GET_USERS } from "./actionTypes";

const initialState = {
    users: []
};
interface types {
    type: string,
    payload: any
}

const userReducer = (state = initialState, { type, payload }: types) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
            };
        default:
            return state;
    }
};

export default userReducer
