import axios from 'axios';

const API_URL = 'http://localhost:8081/api/micromart/product/getCards';

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

// const getProductsByCategory = async (categoryId)=>{
//     try {
//         console.log(categoryId);
//         const response = await axios.get(`${API_URL}/${categoryId}`);
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching products", error);
//         return [];
//     }

// }

export{
    getProducts,
    // getProductsByCategory
}
