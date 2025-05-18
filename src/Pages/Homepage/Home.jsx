import { Link, useParams } from "react-router";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/ProductService.js"; 
import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        let productData = [];
        if (category) {
          productData = await getProducts(category);
        } else {
          productData = await getProducts();
        }
        setProducts(productData);
      } catch (err) {
        setError('Unable to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="homepage">
      <div className="heading">Featured Products</div>

      {loading && <div className="status-message">Loading products...</div>}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && products.length === 0 && (
  <div className="no-products-container">
    <div className="no-products-icon" aria-hidden="true">
      <div className="box" />
      <div className="box" />
      <div className="box" />
    </div>
    <div className="status-message no-products-message">
      No products found. Please try again later.
    </div>
  </div>
)}


      <div className="products-catalogue">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="link-no-style">
            <ProductCard
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
};

export default Home;
