import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3036/shop-v1/api",
    timeout: 20000,
});

axios.interceptors.request.use(
    function (config) {
        return config.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const getDataApi = async (url = "") => {
    try {
        const { data } = await instance.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const postDataApi = async (url = "", body = {}) => {
    try {
        const response = await instance.post(url, body);

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const putDataApi = async (url = "", body = {}) => {
    try {
        const response = await instance.put(url, body);

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const deleteDataApi = async (url = "", body) => {
    try {
        const urlDelete = `${url}/${body}`;
        const response = await instance.delete(urlDelete);

        return response;
    } catch (err) {
        console.log(err);
    }
};
