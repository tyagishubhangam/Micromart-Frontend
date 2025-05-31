import "./ReviewCard.css"

import StarRating from "../StartRating/StarRating.jsx";
const ReviewCard = ({id, rating,description,username})=>{
    console.log(`props:::${description}`)
    return(
        <div className="review-card">
            <div className="review-header">
                <div className="review-header-left">
                    <img src="/avatardefault.png" alt="" className="avatar" />
                <span className="username">Sarah Miller</span>
                </div>
                <StarRating rating={rating} />
            </div>
            <p>{description}</p>
        </div>
    )
}

export{
    ReviewCard
}