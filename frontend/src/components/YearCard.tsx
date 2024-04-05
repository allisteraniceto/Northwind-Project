import React, { useState } from 'react';
import '../styles/YearCard.css'; // Import CSS file for styling

interface YearCardProps {
  year: number;
  onClick: () => void;
  isSelected: boolean; 
}

const YearCard: React.FC<YearCardProps> = ({ year, onClick, isSelected }) => {
  const handleClick = () => {
    onClick(); // Call the onClick function passed from props
  };

  return (
    <div className={`year-card-container ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="year-card">
        {year}
      </div>
      <button className="year-card-button"></button>
    </div>
  );
};

export default YearCard;

