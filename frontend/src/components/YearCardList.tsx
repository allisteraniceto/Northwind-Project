import React from 'react';
import YearCard from './YearCard';
import '../styles/YearCardList.css';

interface YearCardListProps {
  startYear: number;
  endYear: number;
  navigateToReview: (year: number) => void; // Add navigateToReview prop
}

const YearCardList: React.FC<YearCardListProps> = ({ startYear, endYear, navigateToReview }) => {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const handleClick = (year: number) => {
    console.log(`Year ${year} clicked`);
    // Implement your logic here
  };

  return (
    <div className="year-card-list-container">
      {/* Use flexbox to display YearCard components horizontally */}
      <div className="year-card-list">
        {years.map(year => (
          <YearCard key={year} year={year} onClick={() => handleClick(year)} navigateToReview={navigateToReview} />
        ))}
      </div>
    </div>
  );
};

export default YearCardList;
