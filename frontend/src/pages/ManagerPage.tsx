//Manager Dashboard
//Employee Dashboard
import { Link } from 'react-router-dom';
import Header from "../components/Header";
<<<<<<< HEAD
import YearSlider from '../components/YearSlide';
import ClickableStarRating from '../components/ClickableStarRating';
import React, { useState } from 'react';
=======
import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

>>>>>>> origin/main
function ManagerPage() {
  const [overallRating, setOverallRating] = useState<number | null>(null);

  const handleOverallRatingChange = (newRating: number) => {
    setOverallRating(newRating);
    // You can perform additional actions based on the overall rating
  };

  return (
    <>
      <Header dashboard="Manager" />
<<<<<<< HEAD
      <YearSlider />
=======
      <EmployeeList />
      <div className='employee-container'>
        <Link to="/ManagerReviewForm">
          <button type="button" className='performance-review-button'>
            Take Me To This Employee's Performance Review
          </button>
        </Link>
      </div>
>>>>>>> origin/main
    </>
  );
}

export default ManagerPage;
