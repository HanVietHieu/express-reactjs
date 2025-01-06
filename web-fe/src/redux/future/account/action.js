import { USER } from "./type";

export const setDataUserInfo = (data) => ({
    type: USER,
    payload: data
});

