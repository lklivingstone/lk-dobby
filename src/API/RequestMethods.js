import axios from "axios";

const BASE_URL= "https://lk-dobby.onrender.com/";

export const publicRequest= axios.create({
    baseURL: BASE_URL,
});
