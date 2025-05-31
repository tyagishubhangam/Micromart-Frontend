import axios from "./axiosInstance.js";


const addProductToCart = async (productId, quantity)=>{
    const userId = localStorage.getItem("userId");
    const url = "/cart/addToCart"
    try{
        if(userId){
            const reqBody = {
                // "userId": userId,
                "productId" : productId,
                "quantity": quantity
            }

            const response = await axios.post(url,reqBody);
            console.log("addedto cart", response.data);
        }
    }catch(err){
        console.error(err);
    }
    
}

const getUserCart = async ()=>{
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
            const response = await axios.get(`/cart/user/getCart`);
        console.log("temp",response.data);
        return response.data;
    }else{
        throw new Error("An Error Occured fetching the cart");
    }
        
}

const updateQuantity = async (productId,quantity)=>{
    // const userId = localStorage.getItem("userId");
    const response = await axios.put(`/cart/user/product/${productId}/updateQuantity/${quantity}`);
    console.log("updated",response.data);
}

const deleteProductFromCart = async (productId)=>{
    try{
        // const userId = localStorage.getItem("userId");
        const response = await axios.delete(`/cart/user/delete/product/${productId}`);
        console.log("deleted",response.data);
    }catch(err){
        console.log(err);
    }
    
}

export{
    addProductToCart,
    updateQuantity,
    getUserCart,
    deleteProductFromCart
}