import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/ProductService.js"; // Import the service
import "./Home.css";
import {useState, useEffect} from "react";
const Home = ()=>{
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch product data when the component mounts
        const fetchProducts = async () => {
            const productData = await getProducts();
            setProducts(productData);
        };
        
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once
    return(
        <div className="homepage">
            <div className="heading">Featured Products</div>
            <div className="products-catalogue">
            {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        name={product.name}
                        rating={product.rating}
                        price={product.price}
                    />
                ))}

            </div>
        </div>
    );
}

export default Home;