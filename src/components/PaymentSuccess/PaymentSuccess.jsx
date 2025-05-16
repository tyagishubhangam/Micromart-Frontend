import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getPaymentInfo } from "../../services/PaymentService";
import "./PaymentSuccess.css";
import { Link } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");
    const token = searchParams.get("token");

    const confirmPayment = async () => {
      try {
        if (paymentId && payerId && token) {
          await getPaymentInfo(paymentId, payerId, token);
          setSuccess(true);
        }
      } catch (err) {
        console.error("Error confirming payment:", err);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [searchParams]);

  // Auto-redirect after 5 seconds if success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/"); // Change to /orders if you have an order summary page
      }, 5000);
      return () => clearTimeout(timer); // Cleanup
    }
  }, [success, navigate]);

  return (
    <div className="payment-success-container">
      {loading ? (
        <div className="loader"></div>
      ) : success ? (
        <div className="success-content">
          <h1>🎉 Payment Successful!</h1>
          <p>Thank you for your purchase. Redirecting to home...</p>
          <Link to="/" className="success-button">Go to Home Now</Link>
        </div>
      ) : (
        <div className="error-content">
          <h1>❌ Payment Failed</h1>
          <p>There was an issue confirming your payment. Please try again.</p>
          <Link to="/" className="success-button">Return Home</Link>
        </div>
      )}
    </div>
  );
};

export { PaymentSuccess };
