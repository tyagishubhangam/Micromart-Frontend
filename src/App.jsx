import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, useLocation } from "react-router";
import Home from "./Pages/Homepage/Home";
import Footer from "./components/Footer/Footer";
import { SignupPage } from "./Pages/Signup/SignupPage";
import AddProduct from "./Pages/AddProduct/AddProduct";
import { ProductDetail } from "./Pages/ProductDetail/ProductDetail";
import { CategoriesPage } from "./Pages/Categoriespage/CategoriesPage";
import { LoginPage } from "./Pages/LoginPage/LoginPage";
import { CartPage } from "./Pages/CartPage/CartPage";
import { PaymentSuccess } from "./components/PaymentSuccess/PaymentSuccess";
import { PaymentFail } from "./components/PaymentFail/PaymentFail";
import { OrdersPage } from "./Pages/OrdersPage/OrdersPage";
import { OrderInfoPage } from "./Pages/OrderInfoPage/OrderInfoPage";
import UserProfile from "./Pages/ProfilePage/UserProfile";
import OAuth2RedirectHandler from "./components/OAuthHandler/OAuth2RedirectHandler";
// import LoginPage from "./Pages/Login/LoginPage"; // import your login page component

const App = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should not appear
  const hideLayoutRoutes = ["/signup", "/login","/addProduct"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories/:category" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderInfoPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<PaymentFail />} />
        <Route path="/oauth-success" element={<OAuth2RedirectHandler />} />



      </Routes>
      
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
