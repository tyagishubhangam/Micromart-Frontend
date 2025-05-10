import axios from './axiosInstance.js';

const API_URL = '/product/getCards';

const getProducts = async (categoryName) => {
    try {
        const url = categoryName 
            ? `${API_URL}?category=${categoryName}`
            : API_URL;

        const response = await axios.get(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
};



export{
    getProducts,
    
}
