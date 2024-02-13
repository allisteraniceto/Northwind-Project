//Manager Dashboard
//Employee Dashboard
import { Link } from "react-router-dom";
import Header from "../components/Header";
import YearRadioButton from "../components/YearRadioButton";
import '../styles/YearRadioButton.css'

import ClickableStarRating from '../components/ClickableStarRating';
import React, { useState } from 'react';
import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
import "../styles/ManagerSection.css";

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
      <Header dashboard="Manager" />
      <div className="manager-section">
        <div className="employee_list-container">
          <EmployeeList />
        </div>
        <div className="interactions-section">
          <div className="selected-employee-container">
            {/*SELECTED EMPLOYEE*/}
            <p>Selected Employee</p>
          </div>
          <div className="employee-container">
            <h3>Take Me To This Employee's Performance Review</h3>
              <div className="go-button">
              <Link to="/ManagerReviewForm">
                <button type="button" className="performance-review-button">
                  Go
                </button>
              </Link>
              </div>
          </div>


          <div className="previous-years-container">

               <div className="radio-buttons-container">
               <YearRadioButton onYearSelected={handleYearSelected} />
             </div>
            
            
      
            <p>Previous Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
