
//Manager Dashboard
//Employee Dashboard
import Header from "../components/Header";
import React, { useState } from 'react';
import YearCardList from "../components/YearCardList";
import '../styles/YearRadioButton.css';
import '../styles/DeleteButton.css'; // Import the CSS file
import '../styles/YearCard.css'; // Import the CSS file

import '../styles/YearCardList.css'; // Import the CSS file

import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
//import EmployeeList from "../components/EmployeeList";
import AttachmentList from "../components/AttachmentList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";

import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container
import "../styles/ManagerSection.css";
import "../styles/Attachments.css"; //.attachments-container



const ManagerPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleYearSelected = (year: number | null) => {
    console.log(`Year ${year} selected`);
    setSelectedYear(year);

  };

 // const handleClick = () => {
   // console.log('Year clicked');
  //};

  return (
    <>
      <Header dashboard="Manager" />
      <div className="manager-section">
        <div className="employee_list-container">
          <div className="employee-list-header">
            <h3>Direct Reports</h3>
          </div>
          <EmployeeList />
        </div>
        <div className="interactions-section">
          <div className="selected-employee-container">
          {selectedYear !== null && <p>Selected Employee for Year: {selectedYear}</p>}
            {/*SELECTED EMPLOYEE*/}
            <PerformanceReviewButton
              linkTo="/ManagerReviewForm"
              reviewStatus="Finalized"
            />
            <p>Selected Employee</p>
          </div>
          <div className="attachments-container">
            <div className="attachment-list-header">
              <h3>Attachments</h3>
            </div>
            <AttachmentList />
          </div>


          <div className="previous-years-container">
        <YearCardList startYear={2023} endYear={2030} onYearSelected={handleYearSelected} />

           </div>
            
          </div>
      </div>
    </>
  );
}

export default ManagerPage;
