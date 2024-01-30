// /src/components/YearSlider.tsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/YearSlider.css'; 
interface YearSliderProps {
  // Add any props you might need
}

const YearSlider: React.FC<YearSliderProps> = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerPadding: '0'
    
  };

  const handleYearChange = (index: number) => {
    const newYear = years[index];
    setSelectedYear(newYear);
    // You can perform additional actions here based on the selected year
  };

  return (
    <div>
      <h2>Select a year:</h2>
      <Slider {...settings}>
        {years.map((year, index) => (
          <div key={year} onClick={() => handleYearChange(index)}>
            <p className={year === selectedYear ? 'selected' : ''}>{year}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default YearSlider;
