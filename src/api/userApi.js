import axios from 'axios';



const baseURL = 'http://localhost:8080/api/auth';

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
            throw new Error(error.response?.data?.message || 'An error occurred during sign up');
        }
    },
};