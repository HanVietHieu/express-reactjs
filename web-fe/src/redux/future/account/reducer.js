import { USER } from "./type";

const initialState = {
    user: localStorage.getItem('user_info') || ""
}

export const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            let data = "";
            if (action.payload) {
                data = JSON.stringify(action.payload)
                localStorage.setItem('user_info', data)
            }
            return {
                ...state,
                user: data
            };
        default:
            return state;
    }
}