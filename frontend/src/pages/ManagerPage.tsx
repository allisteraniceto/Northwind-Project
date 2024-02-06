//Manager Dashboard

import Header from "../components/Header";
import YearSlider from '../components/YearSlide';
import ClickableStarRating from '../components/ClickableStarRating';
import React, { useState } from 'react';
function ManagerPage() {
  const [overallRating, setOverallRating] = useState<number | null>(null);

  const handleOverallRatingChange = (newRating: number) => {
    setOverallRating(newRating);
    // You can perform additional actions based on the overall rating
  };

  return (
    <>
      <Header dashboard="Manager" />
      <YearSlider />
    </>
  );
}

export default ManagerPage;
