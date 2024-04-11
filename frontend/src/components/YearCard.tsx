
import '../styles/YearCard.css'; // Import CSS file for styling
import React, { useEffect } from 'react';

interface YearCardProps {
  year: number;
  onClick: () => void;
  isSelected: boolean; 
  selectedYear: number | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
}

const YearCard: React.FC<YearCardProps> = ({ year, onClick, isSelected, selectedYear, setSelectedYear }) => {
  const handleClick = () => {
    setSelectedYear(isSelected ? null : year); 
    onClick();; // Call the onClick function passed from props
  };

  useEffect(() => {
    if (!isSelected && selectedYear === year) {
      // If the card is not selected but still has the selectedYear, reset it
      setSelectedYear(null);
    }
  }, [selectedYear, isSelected, year, setSelectedYear]);

  return (
    <div className={`year-card-container ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="year-card">
        {year}
      </div>
      <button className={`year-card-button ${isSelected ? 'selected' : ''}`}></button>
    </div>
  );
};

export default YearCard;

