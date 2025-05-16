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
    return response.data;
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
export const redirectToLogin = () => {
  localStorage.clear();
  window.location.replace('/login?error=sessionExpired');
};

export {
  attemptSignup,
  attemptLogin,
  attemptLogout,  // Export the logout function
};
