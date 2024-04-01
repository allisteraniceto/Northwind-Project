import React, { useState } from 'react';
import '../styles/YearCard.css'; // Import CSS file for styling

interface YearCardProps {
  year: number;
  onClick: () => void;
  navigateToReview: (year: number) => void; // Function to navigate to review for the selected year
}

const YearCard: React.FC<YearCardProps> = ({ year, onClick, navigateToReview }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(!selected); // Toggle the selected state
    onClick(); // Call the onClick function passed from props
    navigateToReview(year); // Navigate to review for the selected year
  };

  return (
    <div className={`year-card-container ${selected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="year-card">
        {year}
      </div>
      <button className="year-card-button" onClick={handleClick}></button>
    </div>
  );
};

export default YearCard;
