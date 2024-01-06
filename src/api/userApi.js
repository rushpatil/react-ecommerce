import axios from 'axios';



const generalError = 'An error occurred, please try again later';

const axiosInstance = axios.create({
    baseURL: '/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userApi = {
    signup: async (userData) => {
        try {
            const response = await axiosInstance.post('/signup', userData);
            console.log(response.headers.get('x-auth-token'));
            return response;
        } catch (error) {
            throw new Error(error.response?.data?.message || generalError);
        }
    },

    login: async (loginData) => {
        try {
            const response = await axiosInstance.post('/signin', loginData);
            let data   = response;
            data.token = response.headers.get('x-auth-token');
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || generalError);
        }
    },
};