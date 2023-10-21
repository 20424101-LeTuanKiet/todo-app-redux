import axios from 'axios';

// baseURL: 'https://api-todoapp.vercel.app/api'
// baseURL: 'http://localhost:3000/api'
const XMLHttpRequests = axios.create({
    baseURL: 'https://api-todoapp.vercel.app/api',
});

XMLHttpRequests.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// XMLHttpRequests.defaults.headers.common['Access-Control-Allow-Methods'] =
//     'POST, PUT, PATCH, GET, DELETE, OPTIONS';
// XMLHttpRequests.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

export const get = async (path, option = {}) => {
    const response = await XMLHttpRequests.get(path, option);
    return { status: response.status, data: response.data };
};

export const post = async (path, option = {}) => {
    const response = await XMLHttpRequests.post(path, option);
    return { status: response.status || 401, data: response.data || {} };
};

export const put = async (path, option = {}) => {
    const response = await XMLHttpRequests.put(path, option);
    return { status: response.status, data: response.data };
};

export default XMLHttpRequests;
