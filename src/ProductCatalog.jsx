import { useState, useEffect } from "react";

import ProductCard from "./components/ProductCard.jsx";

function ProductCatalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/micromart/product/getAll");
        const data = await response.json();
        setProducts(data); // Update state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Run once when component mounts

  console.log(products); // This will log correctly *after* the component re-renders

  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li key={index}>
              <ProductCard props={product}/>
            </li> // Assuming each product has a 'name' property
          ))
        ) : (
          <p>Loading...</p> // Show loading message while data is being fetched
        )}
      </ul>
    </div>
  );
}

export default ProductCatalog;
