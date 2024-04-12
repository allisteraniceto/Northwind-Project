
//Manager Dashboard
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";


import Header from "../components/Header";
import YearCardList from "../components/YearCardList";

import '../styles/YearCard.css'; // Import the CSS file
import '../styles/YearCardList.css'; // Import the CSS file

import "../styles/InteractionsPane.css";
import EmployeeList from "../components/EmployeeList";

import "../styles/InteractionsPane.css";
//import EmployeeList from "../components/EmployeeList";
import AttachmentList from "../components/AttachmentList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import SelectedEmployee from "../components/SelectedEmployee.tsx";

import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container
import "../styles/ManagerSection.css";
import "../styles/Attachments.css"; //.attachments-container

interface ManagerPageProps {
  managerHID: number;
}

function ManagerPage(props: ManagerPageProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
   null
  );

 
  
  const handleYearSelected = (year: number | null) => {
    console.log(`Year ${year} selected`);
    setSelectedYear(year);
  };



  //pass down handler function to set selected employee id
  const handleSelectedEmployee = (employeeID: number | null) => {
    setSelectedEmployeeID(employeeID);
  };

  //POST request after every selected employee, send employeeHID to backend to set global
  useEffect(() => {
    axios
      .post(
        `${config.apiUrl}/SubmissionForm/SetSelectedEmployeeHID`,
        selectedEmployeeID,
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type here
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [selectedEmployeeID]); //when selectedEmployee, set employeeHID global in backend

  return (
    <>
      <Header dashboard="Manager" />
      <div className="employee_list-container">
        <div className="employee-list-header">
          <h3>Direct Reports</h3>
        </div>
        <EmployeeList
          setEmployeeID={handleSelectedEmployee}
          dashboard="ManagerDashboard"
          listType="EmployeeList"
          managerHID={props.managerHID}
        />
      </div>
      <div className="selected-employee-container">

        
           {/* Display performance review year only when both an employee and a year are selected */}
           {selectedEmployeeID !== null && selectedYear !== null ? (
            <p>Performance Review Year: {selectedYear}</p>
          ) : selectedEmployeeID !== null ? (
            <p>Please select a performance review year</p>
          ) : (
            <p>Please select an employee</p>
          )}

        <SelectedEmployee EmployeeId={selectedEmployeeID} />

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
        {selectedEmployeeID && <AttachmentList />}
      </div>
      <div className="previous-years-container">
        {/*PREVIOUS REVIEWS*/}
        <YearCardList startYear={2023} endYear={2029} onYearSelected={handleYearSelected} />

      </div>
    </>
  );
}

export default ManagerPage;