import axios from './axiosInstance.js';

const API_URL = '/product/category/getAll';

export const getCategories = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
    }
};
