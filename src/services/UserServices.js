import axios from "./axiosInstance.js";

// Signup function
const attemptSignup = async (userData) => {
  try {
    const response = await axios.post("/user/signup", userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Login function
const attemptLogin = async (credentials) => {
  try {
    const response = await axios.post('/user/login', credentials);
    return response.data.data;
  } catch (error) {
    // Extract readable error
    const message =
      error.response?.data?.message || 'Login failed. Please try again.';
    console.log("message", message);
    throw new Error(message);
  }
};

// Logout function
const attemptLogout = () => {
  // Clear session data from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  localStorage.removeItem('avatar');

  // Optionally, you can redirect the user to the login page after logout
  window.location.replace('/login');
};

// Function to redirect to login if session expires
const redirectToLogin = () => {
  localStorage.clear();
  window.location.replace('/login?error=sessionExpired');
};


//GET user profile
const getUser = async ()=>{
  try{
    const resp = await axios.get("/user/get");
    console.log(resp);
    return resp.data.data;
  }catch(error){
    console.log(error);
  }
} 

const updateUserProfile = async (data)=>{
  try{
     const resp = await axios.patch("/user/update",data);
    console.log("UPDATED ",resp.data);
  }catch(err){
    console.log(err);
    throw new Error("Error updating profile");
    
  }
   
}

const updateProfileAvatar  = async (newImage)=>{
  try{
    const resp = await axios.patch("/user/update/avatar", newImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return resp.data;
  }catch(error){
    console.log(error);
    throw new Error("Error Uploading Image");
  }
}

export {
  attemptSignup,
  attemptLogin,
  attemptLogout, 
  redirectToLogin,
  getUser,
  updateUserProfile,
  updateProfileAvatar
};
