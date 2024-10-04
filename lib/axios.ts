import Axios from "axios";

const myAxios = Axios.create({
    baseURL: process.env.NUXT_PUBLIC_BACKEND_URL,
    timeout: 10000,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
    }
});

export default myAxios;