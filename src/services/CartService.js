import axios from "./axiosInstance.js";

const addProductToCart = async (data)=>{
    const userId = localStorage.getItem("userId");
    
    const response = await axios.post("/cart/addToCart",)
}

const getUserCart = async ()=>{
    const userId = localStorage.getItem("userId");
    if(userId){
            const response = await axios.get(`/cart/user/${userId}/getCart`);
        console.log("temp",response.data);
        return response.data;
    }else{
        throw new Error("An Error Occured fetching the cart");
    }
        
}

const updateQuantity = async (productId,quantity)=>{
    const userId = localStorage.getItem("userId");
    const response = await axios.put(`/cart/user/${userId}/product/${productId}/updateQuantity/${quantity}`);
    console.log("updated",response.data);
}

const deleteProductFromCart = async (productId)=>{
    try{
        const userId = localStorage.getItem("userId");
        const response = await axios.delete(`/cart/user/${userId}/delete/product/${productId}`);
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