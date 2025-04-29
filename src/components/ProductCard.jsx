


const ProductCard = (props)=>{
    const {
        // eslint-disable-next-line react/prop-types
        productName,
        productDescription,
        category,
        price,
        image
    } = props.props;
    return(
        <div className="product-card">
            {/* <h3>{productName}</h3>
            <p>{productDescription}</p>
            <h5>{price}</h5>
            <p>{category}</p> */}
            <img src="src/assets/product_placeholder.webp" alt="image" />
            <h3>Product name</h3>
            <p>Product image</p>
            <h5>Price: 100</h5>
            <p>Category</p>
        </div>
    )

}


export default ProductCard;