import axios from "./axiosInstance.js"
import { getUserCart } from "./CartService"

const placeOrder = async()=>{
    const userId = localStorage.getItem("userId");
    const userCart = await getUserCart();
    const productsInCart = userCart.productsInCart;
    const totalAmount = userCart.totalAmount;
    const reqBody = {totalAmount:totalAmount,
        orderItems:[],
        userId:userId
    };
    productsInCart.map((productItem, index)=>{
        reqBody.orderItems = [...reqBody.orderItems,{
            productId:productItem.product.id,
            quantity:productItem.quantity
        }]
    })

    return reqBody;

}

const getUserOrders = async ()=>{
    const userId = localStorage.getItem("userId")
    const resp = await axios.get(`/order/users/${userId}/orders`
    );
    console.log("User Orders", resp.data.data);
    return resp.data;
}

const getOrder = async (orderId)=>{
    const resp = await axios.get(`/order/orders/${orderId}`);
    console.log(resp.data);
    return resp.data;

}

export{
    placeOrder,
    getUserOrders,
    getOrder
}