// import productimg from "./productimg.png";
import StarRating from "../StartRating/StarRating";
import "./ProductCard.css"
const ProductCard = (props)=>{
    const{id,name, price, rating, image} = props
    return (
        <div className="product-card" id={id}>
            <img src={image} alt="img" />
            <div className="product-details">
                <p className="product-name">{name}</p>
                <StarRating rating={rating} />
                <p>${price}</p>

            </div>
            <button >Add to Cart</button>

        </div>
    )
}

export default ProductCard;