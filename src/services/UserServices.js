import axios from "./axiosInstance.js";



const attemptSignup= async (userData)=>{
    try{

        const response = await axios.post("/user/signup",userData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        console.log(response.data);
        return response;
    }catch(err){
        console.log(err)
        
        
    }
    
}

const attemptLogin = async (credentials)=>{
    try{
        const response = await axios.post('/user/login', credentials);
        return response.data;
    }catch (error) {
        // Extract readable error
        const message =
          error.response?.data?.message || 'Login failed. Please try again.';
        throw new Error(message);
      }
}



export{
    attemptSignup,
    attemptLogin
}
    
