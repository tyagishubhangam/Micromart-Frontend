import "./ProductDetail.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../services/axiosInstance.js";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import { addProductToCart } from "../../services/CartService.js";
import { postReview } from "../../services/ReviewServices.js";
import { getProductDetails } from "../../services/ProductService.js";
import StarRating from "../../components/StartRating/StarRating.jsx";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [reviewName, setReviewName] = useState(""); // ⭐ NEW
  const [reviewDesc, setReviewDesc] = useState(""); // ⭐ NEW
  const [rating, setRating] = useState(0); // ⭐ NEW

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addProductToCart(productId, quantity);
      navigate("/cart");
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await getProductDetails(id);
      // console.log(res);
      
      setProduct(res);
    } catch (err) {
      setError("Product not found or error fetching");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const submitReview = async () => {
  if (!reviewName || !reviewDesc || rating === 0) {
    alert("Please fill all fields including rating");
    return;
  }

  try {
    

    await postReview(
      
      {
        userFullName: reviewName,
        productId: id,
        description: reviewDesc,
        rating: rating,
      }
      
    );

    // Reset form
    setReviewName("");
    setReviewDesc("");
    setRating(0);
    fetchProduct(); // Refresh reviews after submission
  } catch (err) {
    console.error("Error submitting review:", err);
    alert("Failed to submit review");
  }
};


  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-page">
      <section className="content">
        <img src={product.image} alt="prodname" className="product-img" />
        <div className="product-details">
          <div className="heading-1">{product.productName}</div>
          <p className="price">${product.price}</p>
          <p className="rating-txt">{parseFloat(Math.round(product.rating * 10) / 10)}</p>
          <div className="rating-stars"><StarRating rating={product.rating} /></div>
          <p className="product-description">{product.productDescription}</p>
          <button className="btn-typ4" onClick={() => handleAddToCart(product.id, 1)}>
            Add To Cart
          </button>
        </div>
      </section>

      <section className="reviews">
        <h2 className="heading-1">Customer Reviews</h2>



        {/* ⭐ No reviews message */}
        {product.reviews.length === 0 ? (
          <div className="no-reviews">
            <p>📝 No reviews yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          product.reviews.map((review, index) => <ReviewCard key={index} {...review} />)
        )}
                {/* ⭐ Enhanced Review Form */}
        <div className="add-review-form">
          <h3>Write a Review</h3>
          <input
            type="text"
            placeholder="Your Full Name"
            value={reviewName}
            onChange={(e) => setReviewName(e.target.value)}
          />
          <textarea
            rows="4"
            placeholder="Write your review here..."
            value={reviewDesc}
            onChange={(e) => setReviewDesc(e.target.value)}
          ></textarea>

          <div className="stars-input">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? "filled" : ""}`}
                onClick={() => handleStarClick(index)}
              >
                ★
              </span>
            ))}
            <span className="rating-number">({rating})</span>
          </div>

          <button onClick={submitReview}>Submit Review</button>
        </div>
      </section>
    </div>
  );
};

export { ProductDetail };
