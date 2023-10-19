import axios from 'axios';

const XMLHttpRequests = axios.create({
    baseURL: 'https://api-todoapp.vercel.app/api',
});

export const get = async (path, option = {}) => {
    const response = await XMLHttpRequests.get(path, option);
    return response.data;
};

export const post = async (path, option = {}) => {
    const response = await XMLHttpRequests.post(path, option);
    return response.data;
};

export default XMLHttpRequests;
