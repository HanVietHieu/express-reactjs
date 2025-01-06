import { USER } from "./type";

const initialState = {
    user: localStorage.getItem('user_info') || ""
}

export const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            const data= JSON.stringify(action.payload?.data?.data)
            localStorage.setItem('user_info', data)
            return {
                ...state,
                user: data
            };
        default:
            return state;
    }
}