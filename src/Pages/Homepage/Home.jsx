import { Link, useParams } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/ProductService.js"; // Import the service
import "./Home.css";
import {useState, useEffect} from "react";
const Home = ()=>{
    const [products, setProducts] = useState([]);
    const { category } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
          let productData = [];
          if (category) {
            productData = await getProducts(category);
          } else {
            productData = await getProducts();
          }
          setProducts(productData);
        };
      
        fetchProducts();
      }, [category]); // 👈 this makes the effect re-run when categoryId changes
      
    return(
        <div className="homepage">
            <div className="heading">Featured Products</div>
            <div className="products-catalogue">
            {products.map((product, index) => (
                   <Link to={`/product/${product.id}`} key={product.id} className="link-no-style" > 
                   <ProductCard
                        key={index}
                        name={product.name}
                        rating={product.rating}
                        price={product.price}
                        image={product.image}
                    />
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Home;