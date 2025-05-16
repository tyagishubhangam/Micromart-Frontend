import axios from "./axiosInstance.js";
import { placeOrder } from "./OrderService.js";


const createPayment = async (amount, description) => {
  try {
    const resp = await axios.post(
      "/payment/create",
      null,
      {
        params: { amount, description },
        headers: {
          "Accept": "application/json"
        }
      }
    );

    // Use the approval URL returned by your backend
    if (resp.data.approvalUrl) {
      window.location.href = resp.data.approvalUrl;
    } else {
      alert("No approval URL received from backend");
    }
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    alert("Payment creation failed!");
  }
};



const getPaymentInfo = async (paymentId,payerId,token)=>{
    // let userId = localStorage.getItem("userId");
    const orderReq = await placeOrder();
    orderReq.paymentId = paymentId;
    console.log(orderReq);
    try{
        if(paymentId && payerId){
            const resp = await axios.post("/payment/success",orderReq,
                {
                  params : { paymentId, PayerID: payerId, token}
                }
            )
            
            
            console.log("Payment success response:",resp.data);
        }
    }catch(err){
        console.log(err);
    }
}

export{
    getPaymentInfo,
    createPayment
}