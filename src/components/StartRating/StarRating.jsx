const StarRating = ({rating}) => {
    console.log(rating,"rating")
    const totalStars = 5;
  
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[...Array(totalStars)].map((_, index) => (
          <span key={index} style={{ color: index < rating ? '#FFD700' : '#CCC' }}>
            ★
          </span>
        ))}
      </div>
    );
  };
  
  export default StarRating;