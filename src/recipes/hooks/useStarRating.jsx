
import React, { useState } from "react";

const RecipeRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div div className="star-rating mb-0">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          style={{
            cursor: 'pointer',
            color: (value <= (hoverRating || rating)) ? 'gold' : 'black',
          }}
          onClick={() => handleClick(value)}
          onMouseOver={() => handleMouseOver(value)}
          onMouseLeave={handleMouseLeave}
        >
          {value <= (hoverRating || rating) ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default RecipeRating;
