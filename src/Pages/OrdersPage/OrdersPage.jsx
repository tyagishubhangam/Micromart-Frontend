import { useEffect, useState } from "react";
import { getUserOrders } from "../../services/OrderService";
import "./OrdersPage.css";
import { OrderItemBanner } from "../../components/OrderItemBanner/OrderItemBanner";
import { Link } from "react-router";

const OrdersPage = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this logic as needed

  useEffect(() => {
    const userToken = localStorage.getItem("accessToken"); // or however you track login
    if (!userToken) {
      setIsLoggedIn(false);
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const data = await getUserOrders();
        setUserOrders(data.data);
        console.log(data.message);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchUserOrders();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="login-required-banner">
        <h2>Please Log In to View Your Orders</h2>
        <p>We're excited to show you your order history — just log in first!</p>
        <Link to="/login" className="login-btn">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <div className="user-orders">
        {userOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          userOrders.map((order, index) => (
            <Link to={`/orders/${order.orderId}`} key={index} className="order-link">
              <OrderItemBanner order={order} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export { OrdersPage };
