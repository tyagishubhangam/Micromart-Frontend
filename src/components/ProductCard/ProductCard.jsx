import productimg from "./productimg.png";
import "./ProductCard.css"
const ProductCard = (props)=>{
    const{name, price, rating} = props
    return (
        <div className="product-card">
            <img src={productimg} alt="img" />
            <div className="product-details">
                <p className="product-name">{name}</p>
                <p>{rating}</p>
                <p>{price}</p>
            </div>
            <button >Add to Cart</button>

        </div>
    )
}

export default ProductCard;