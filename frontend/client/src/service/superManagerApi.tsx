import { BACKEND_SUPER_MANAGER_URL } from "@/utils/constants";
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
        const response = await axiosInstance.get(`${BACKEND_SUPER_MANAGER_URL}/get-employees?${query}`);
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};

export const fetchAllEmployeesApi = async (query: object) => {
    try {
        const response = await axiosInstance.get(`${BACKEND_SUPER_MANAGER_URL}/get-all-employees?${query}`);
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};

export const fetchManagersApi = async (query: object | undefined) => {
    try {
        const response = await axiosInstance.get(`${BACKEND_SUPER_MANAGER_URL}/get-managers?${query}`);
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};

export const assignManagerApi = async (userId: string, managerId: string) => {
    try {
        const response = await axiosInstance.put(`${BACKEND_SUPER_MANAGER_URL}/assign-manager`, { userId, managerId });
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};

export const promoteToManagerApi = async (employeeId: string) => {
    try {
        const response = await axiosInstance.patch(`${BACKEND_SUPER_MANAGER_URL}/promote-to-manager/${employeeId}`);
        return response;
    } catch (error: unknown) {
        console.log(error, "from user signUp api Call <-:")
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data.error)
        }
    }
};
