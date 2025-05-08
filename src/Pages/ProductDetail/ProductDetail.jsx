import "./ProductDetail.css"
import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import axios from 'axios';


const ProductDetail  =()=>{

    const { id } = useParams(); // grabs the :id from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/micromart/product/get/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError('Product not found or error fetching');
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail-page">
            <section className="content">
            <img src={product.image} alt="prodname" className="product-img" />
            <div className="product-details">
                <div className="heading-1">
                    {product.productName}
                </div>
                <p className="price">
                    ${product.price}
                </p>
                <p className="rating-txt">4.5</p>
                <div className="rating-stars">
                    ******
                </div>
                <p className="product-description">
                    {product.productDescription}
                </p>
                <button className="btn-typ4">Add To Cart</button>
            </div>
            </section>
            <section className="reviews">
                <h2>Reviews</h2>
            </section>
        </div>
    )
}

export{
    ProductDetail
}