import axios from "axios";
const {VITE_BASE_URL} =import.meta.env
const instance = axios.create({
    baseURL:VITE_BASE_URL,
    withCredentials: true

});

export default instance