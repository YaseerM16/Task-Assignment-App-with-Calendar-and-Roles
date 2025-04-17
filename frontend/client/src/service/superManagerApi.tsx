import { BACKEND_USER_URL } from "@/utils/constants";
import { LoginUser, RegisterUser } from "@/utils/user.types";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
    headers: {
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if ((error.response?.status === 403 || error.response?.status === 401) && window.location.pathname !== "/login") {
            console.log("Redirecting due to 403 error...");
            // await handleLogout(); // Call the function
        }
        return Promise.reject(error);
    }
);


export const fetchEmployeesApi = async (query: object) => {
    try {
        const response = await axiosInstance.get(`${BACKEND_USER_URL}/get-users?${query}`);
        console.log("getEmployees REs in Api :-> ", response);
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};