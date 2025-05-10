

// {
//   "productsInCart": [
//     {
//       "product": {
//         "id": 5,
//         "productName": "Iphone 16 pro",
//         "productDescription": "kbijsbicbskbckasbc,sa",
//         "category": "electronics",
//         "price": 137700,
//         "image": "https://res.cloudinary.com/dlotcoc2a/image/upload/v1746700305/products/ozyndzeh2kj3xggcol3t.png"
//       },
//       "quantity": 10
//     },
//     {
//       "product": {
//         "id": 3,
//         "productName": "Black Jacket",
//         "productDescription": "A black leather jacket finest quality leather",
//         "category": "apparels",
//         "price": 200,
//         "image": "https://res.cloudinary.com/dlotcoc2a/image/upload/v1746697759/products/kkxv1u16vlnlom8vot54.png"
//       },
//       "quantity": 10
//     }
//   ],
//   "totalAmount": 1379000
// }

import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import { getUserCart,updateQuantity } from "../../services/CartService.js";
import "./CartPage.css";
import { useEffect, useState } from "react";

const CartPage = () => {
    const [cartAmount,setCartAmount] = useState(0); 
    const accessToken = localStorage.getItem("accessToken");
    const [cartData, setCartData] = useState([]);
    const handleProductDelete = (productId) => {
        setCartData((prev) => prev.filter((item) => item.product.id !== productId));
        fetchUserCart();
    };
    const fetchUserCart = async ()=>{
       const cart = await getUserCart();
        setCartData(cart.productsInCart);
        setCartAmount(cart.totalAmount);
    };

    const handleQuantityChange = async (productId, newQty) => {
        await updateQuantity(productId, newQty); // this updates in backend
        const updatedCart = await getUserCart(); // re-fetch updated cart
        setCartData(updatedCart.productsInCart);
        setCartAmount(updatedCart.totalAmount);
};

  useEffect(()=>{
    fetchUserCart();
  },[])

  return (
    <>
      {accessToken ? (
        <div className="cart-container">
          <div className="cart-left">
            <div className="cart-heading">
              <h1>Your Cart</h1>
              <p>
                Review your selected items below before proceeding to checkout.
                Make sure everything looks good!
              </p>
            </div>
            <div className="product-list">
              
            {cartData.map((product,index)=>(
                <ProductInCart key={index} product={product} onDelete={handleProductDelete} onQuantityChange={handleQuantityChange}/>
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
              <span>$125</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${cartAmount + 125}</span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      ) : (
        <div className="banner">Please login first</div>
      )}
    </>
  );
};

export { CartPage };
