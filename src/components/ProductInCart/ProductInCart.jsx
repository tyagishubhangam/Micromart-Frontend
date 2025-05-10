import "./ProductInCart.css"
import { useEffect, useState } from "react";
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


import { FaTrash } from "react-icons/fa";
import { deleteProductFromCart, updateQuantity } from "../../services/CartService";

const ProductInCart = ({product,onDelete,onQuantityChange}) => {
    
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleDelete = async () =>{
    await deleteProductFromCart(product.product.id);
    if (onDelete) {
      onDelete(product.product.id); // inform parent
    }
  }

  useEffect(() => {
  const updateQuant = async () => {
    await updateQuantity(product.product.id, quantity); // optional (already in parent)
    if (onQuantityChange) {
      onQuantityChange(product.product.id, quantity); // inform parent to refetch cart
    }
  };
  updateQuant();
}, [quantity]);

  return (
    <div className="product-cart">
      <img src={product.product.image} alt="product" className="product-img" />

      <div className="prod-cart-info">
        <div className="prod-header">
          <div>
            <div className="p-name">{product.product.productName}</div>
            <div className="p-meta">Size: M | Color: Black</div>
          </div>
          <FaTrash className="delete-icon" onClick={handleDelete}/>
        </div>

        <div className="prod-footer">
          <div className="quantity-control">
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            <span>{quantity}</span>
            <button onClick={handleDecrease}>−</button>
          </div>
          <div className="p-price">${product.product.price * quantity}</div>
        </div>
      </div>
    </div>
  );
};

export { ProductInCart };
