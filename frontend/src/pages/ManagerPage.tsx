
//Manager Dashboard
import { useState, useEffect } from "react";

import Header from "../components/Header";
import YearCardList from "../components/YearCardList";

import '../styles/DeleteButton.css'; // Import the CSS file
import '../styles/YearCard.css'; // Import the CSS file

import '../styles/YearCardList.css'; // Import the CSS file

import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
//import EmployeeList from "../components/EmployeeList";
import AttachmentList from "../components/AttachmentList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import Rectangle from "../components/rectangle";

import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container
import "../styles/ManagerSection.css";
import "../styles/Attachments.css"; //.attachments-container

function ManagerPage() {


  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
   null
  );

  //When clicking on an employee, it should
  //select the current year. Or else a user
  //will have to scroll all the way down to select a year. 

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setSelectedYear(currentYear);
  }, []);

  //pass down handler function to set selected employee id
  const handleSelectedEmployee = (employeeID: number | null) => {
    setSelectedEmployeeID(employeeID);
  };

  const handleYearSelected = (year: number | null) => {
    console.log(`Year ${year} selected`);
    setSelectedYear(year);
  };

 
  return (
    <>
      <Header dashboard="Manager" />
      {/* <div className="manager-section"> */}
      <div className="employee_list-container">
        <div className="employee-list-header">
          <h3>Direct Reports</h3>
        </div>
        <EmployeeList setEmployeeID={handleSelectedEmployee} />
      </div>
      {/* <div className="interactions-section"> */}
      <div className="selected-employee-container">
      <Rectangle EmployeeId={1} />
         {/* Display performance review year only when both an employee and a year are selected */}
         {selectedEmployeeID !== null && selectedYear !== null ? (
            <p>Performance Review Year: {selectedYear}</p>
          ) : selectedEmployeeID !== null ? (
            <p>Please select a performance review year</p>
          ) : (
            <p>Please select an employee</p>
          )}
          <PerformanceReviewButton
          linkTo="/ManagerReviewForm"
          reviewStatus="Finalized"
          />

        <p>User ID: {selectedEmployeeID}</p>
        
      </div>
      <div className="attachments-container">
        
        <div className="attachment-list-header">
          <h3>Attachments</h3>
        </div>
        {/*conditionally render attachment list*/}
        {selectedEmployeeID !== null && selectedYear !== null && <AttachmentList />}
        </div>
      <div className="previous-years-container">
        {/*PREVIOUS REVIEWS*/}
        <YearCardList startYear={2023} endYear={2029} onYearSelected={handleYearSelected} />

      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default ManagerPage;