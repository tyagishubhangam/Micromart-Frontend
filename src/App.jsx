import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router";
import Home from "./Pages/Homepage/Home";
import Footer from "./components/Footer/Footer";
import { SignupPage } from "./Pages/Signup/SignupPage";
// import LoginPage from "./Pages/Login/LoginPage"; // import your login page component

const App = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should not appear
  const hideLayoutRoutes = ["/signup", "/login"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
      
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
