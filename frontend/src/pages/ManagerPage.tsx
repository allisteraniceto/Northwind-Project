//Manager Dashboard
//Employee Dashboard
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import YearRadioButton from "../components/YearRadioButton";
import '../styles/YearRadioButton.css'

import ClickableStarRating from '../components/ClickableStarRating';
import React, { useState } from 'react';
import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

function ManagerPage() {
  const [overallRating, setOverallRating] = useState<number | null>(null);

  const handleOverallRatingChange = (newRating: number) => {
    setOverallRating(newRating);
    // You can perform additional actions based on the overall rating
  };

  const handleYearSelected = (year: string) => {
    // Implement your logic when a year is selected
    console.log("Year selected:", year);
  };

  
  return (
    <>
      <div>
      <div className="button-container">
        <div className='performance-review-button'>
          Take Me To This Employee's Performance Review
          <button type="button">Go</button>
        </div>
      </div>

      <div className="radio-buttons-container">
        <YearRadioButton onYearSelected={handleYearSelected} />
      </div>
    </div>
      <EmployeeList />
      <div className='employee-container'>
        <Link to="/ManagerReviewForm">
          <button type="button" className='performance-review-button'>
            Take Me To This Employee's Performance Review
          </button>
        </Link>
      </div>
    </>
  );
}

export default ManagerPage;
