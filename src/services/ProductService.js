import axios from './axiosInstance.js';

const API_URL = '/product';

const getProducts = async (categoryName) => {
    try {
        const url = categoryName 
            ? `${API_URL}/getCards?category=${categoryName}`
            : `${API_URL}/getCards`;

        const response = await axios.get(url);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
    }
};


const getProductDetails = async (productId)=>{
    try{
        
        const response = await axios.get(`${API_URL}/get/${productId}`);
        console.log(productId,"fetching deatils")
        return response.data;
    }catch(err){
        throw new Error(err);
    }

}


export{
    getProducts,
    getProductDetails
    
}
