// /src/components/YearSlider.tsx
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/YearSlider.css';

interface YearSliderProps {
  // Add any props you might need
}

const YearSlider: React.FC<YearSliderProps> = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleYearChange = (newYear: number) => {
    setSelectedYear(newYear);

    // Navigate to a new page based on the selected year
    navigate(`/manager/year/${newYear}`);
  };

  return (
    <div className="year-box-container">
      {years.map((year) => (
        <button
          key={year}
          className={year === selectedYear ? 'selected' : ''}
          onClick={() => handleYearChange(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );
};


*/