import axios from 'axios';



const baseURL = 'http://localhost:8080/api/auth';
const generalError = 'An error occurred, please try again later';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = {
    signup: async (userData) => {
        try {
            const response = await axiosInstance.post('/signup', userData);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || generalError);
        }
    },

    login: async (loginData) => {
        try {
            const response = await axiosInstance.post('/signin', loginData);
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || generalError);
        }
    },
};