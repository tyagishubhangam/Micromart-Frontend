import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getOrder } from "../../services/OrderService";
import "./OrderInfoPage.css";
import { LoginRequired } from "../../components/LoginRequiredBanner/LoginRequired";

const OrderInfoPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using accessToken in localStorage to check login
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    const fetchOrder = async () => {
      try {
        const res = await getOrder(orderId);
        setOrder(res.data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <LoginRequired loc="order"/>
    );
  }

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div className="no-order">No order data found.</div>;

  const {
    orderStatus,
    orderDate,
    paymentId,
    products,
    totalPrice,
  } = order;

  const formattedDate = new Date(orderDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="order-info-page">
      <div className="order-summary">
        <h1>Order Details</h1>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${orderStatus.toLowerCase()}`}>
            {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
          </span>
        </p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <p><strong>Total Price:</strong> ₹{totalPrice}</p>
      </div>

      <div className="products-container">
        {products.map(({ product, quantity }) => (
          <div key={product.id} className="product-info-card">
            <img src={product.image} alt={product.productName} />
            <div className="product-info">
              <h3>{product.productName}</h3>
              <p className="category">{product.category}</p>
              <p>Quantity: {quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { OrderInfoPage };
