import React, { useState } from 'react';
import YearCard from './YearCard';
import '../styles/YearCardList.css';

interface YearCardListProps {
  startYear: number;
  endYear: number;
  onYearSelected: (year: number | null) => void; // Updated type to accept null for deselection
}

const YearCardList: React.FC<YearCardListProps> = ({ startYear, endYear, onYearSelected }) => {
 

const [selectedYear, setSelectedYear] = useState<number | null>(null);

const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
  years.push(year);
}



  const handleClick = (year: number) => {
    console.log(`Year ${year} clicked`);
    if (selectedYear === year) {
      // If the clicked year is already selected, deselect it
      setSelectedYear(null);
      onYearSelected(null);
    } else {
      // Otherwise, select the clicked year
      setSelectedYear(year);
      onYearSelected(year);
    }
  };

  return (
    <div className="year-card-list-container">
      <div className="year-card-list">
        {years.map((year) => (
          <YearCard
            key={year}
            year={year}
            onClick={() => handleClick(year)}
            isSelected={year === selectedYear} // Pass isSelected prop to YearCard
          />
        ))}
      </div>
    </div>
  );
};

export default YearCardList;
