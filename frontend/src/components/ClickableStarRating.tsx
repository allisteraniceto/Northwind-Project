// /src/components/ClickableStarRating.tsx
import React, { useState } from 'react';
import Star from './Stars';

interface ClickableStarRatingProps {
  onRatingChange: (newRating: number) => void;
}

const ClickableStarRating: React.FC<ClickableStarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleStarClick = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="clickable-star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          selected={value <= (rating || 0)}
          onClick={() => handleStarClick(value)}
        />
      ))}
    </div>
  );
};

export default ClickableStarRating;
