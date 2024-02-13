import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/YearRadioButton.css'


interface YearRadioButtonProps {
  onYearSelected: (year: string) => void;
}

const YearRadioButton: React.FC<YearRadioButtonProps> = ({ onYearSelected }) => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const yearRange = Array.from({ length: 6 }, (_, index) => (nextYear - index).toString());
    setYears(yearRange);
  }, []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    onYearSelected(year);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {years.map((year) => (
        <label key={year}>
          <input type="radio" name="year" value={year} onChange={() => handleYearChange(year)} />
          {year}
        </label>
      ))}
      {selectedYear && (
        <Link to="/ManagerReviewForm">
          <button>Go to Review Form</button>
        </Link>
      )}
    </div>
  );
};

export default YearRadioButton;
