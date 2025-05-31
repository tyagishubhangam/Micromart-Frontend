import "./ProductDetail.css"
import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import axios from '../../services/axiosInstance.js';
import StarRating from "../../components/StartRating/StarRating";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import { addProductToCart } from "../../services/CartService.js";


const ProductDetail  =()=>{
  const navigate = useNavigate();

    const { id } = useParams(); // grabs the :id from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleAddToCart = async (productId, quantity)=>{
    try{
      console.log("clicked add to cart");
      await addProductToCart(productId,quantity);
      navigate("/cart");
    }catch(err){
      setError(err);
    }
    
      
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/product/get/${id}`);
        // console.log(res.data.reviews)
        
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
                <button className="btn-typ4" onClick={()=>handleAddToCart(product.id,1)}>Add To Cart</button>
            </div>
            </section>
            <section className="reviews">
                <h2 className="heading-1">Customer Reviews</h2>
                
                {
                product.reviews.map((review, index)=>(
                  <ReviewCard key={index} {...review} />
                ))
              } 
            </section>
        </div>
    )
}

export{
    ProductDetail
}