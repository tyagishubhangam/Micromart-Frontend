import { LoginRequired } from "../../components/LoginRequiredBanner/LoginRequired.jsx";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import { getUserCart, updateQuantity } from "../../services/CartService.js";
import { createPayment } from "../../services/PaymentService.js";
import "./CartPage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const handleProductDelete = (productId) => {
    setCartData((prev) => prev.filter((item) => item.product.id !== productId));
    fetchUserCart();
  };

  const fetchUserCart = async () => {
    const cart = await getUserCart();
    setCartData(cart.productsInCart || []);
    setCartAmount(cart.totalAmount || 0);
  };

  const handleQuantityChange = async (productId, newQty) => {
    await updateQuantity(productId, newQty);
    const updatedCart = await getUserCart();
    setCartData(updatedCart.productsInCart);
    setCartAmount(updatedCart.totalAmount);
  };

  const makePayment = async (amount, description) => {
    setIsLoading(true);
    const resp = await createPayment(amount, description);
    console.log(resp, "CREATING PAYMENT");
    // setIsLoading(false);
  };

  useEffect(() => {
    if (accessToken) fetchUserCart();
  }, []);

  if (!accessToken) {
    return (
      <>
      <LoginRequired loc={"cart"}/>
      </>
    );
  }

  if (cartData.length === 0) {
    return (
      <div className="empty-cart-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="empty-cart-image"
        />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/categories" className="shop-now-btn">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-heading">
          <h1>Your Cart</h1>
          <p>Review your selected items below before proceeding to checkout.</p>
        </div>
        <div className="product-list">
          {cartData.map((product, index) => (
            <ProductInCart
              key={index}
              product={product}
              onDelete={handleProductDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>${cartAmount}</span>
        </div>
        <div className="summary-item">
          <span>Estimated Delivery and Handling</span>
          <span>Free</span>
        </div>
        <div className="summary-item">
          <span>Estimated Taxes:</span>
          <span>$0</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <span>${cartAmount}</span>
        </div>
        <button
          className="checkout-btn"
          onClick={() => makePayment(cartAmount, "SALE")}
          disabled={cartAmount === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" /> Redirecting...
            </>
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export { CartPage };
