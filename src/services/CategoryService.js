import axios from 'axios';

const API_URL = 'http://localhost:8081/api/micromart/category/getAll';

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
