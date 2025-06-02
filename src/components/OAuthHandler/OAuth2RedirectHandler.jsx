import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { getUser } from "../../services/UserServices";

const OAuth2RedirectHandler = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("token");

    if (!accessToken) {
      navigate("/login?error=sessionExpired");
      return;
    }

    // Store token immediately
    localStorage.setItem("accessToken", accessToken);

    // Now fetch user data using the token
    const fetchUserData = async () => {
      try {
        const data = await getUser();  // Make sure getUser uses the token internally in headers
        if (data) {
          // Store user details in localStorage
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("email", data.email);
          localStorage.setItem("avatar", data.profilePicUrl);

          navigate("/");  // Redirect after successful fetch
        } else {
          // If data is empty or undefined, redirect to login
          navigate("/login?error=sessionExpired");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login?error=sessionExpired");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

  }, [location.search, navigate]);

  if (loading) {
    return <div>Logging you in...</div>;
  }

  return null; // Or a fallback UI if needed
};

export default OAuth2RedirectHandler;
