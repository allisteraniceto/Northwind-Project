//HR Dashboard
import { useEffect, useState } from "react";

import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";
import SelectedEmployee from "../components/SelectedEmployee";
import BackButton from "../components/BackButton";
import StartReviewProcessButton from "../components/StartReviewProcessButton";

import "../styles/HrDashboard.css";
import "../styles/EmployeeList.css";
import "../styles/Attachments.css"; //.attachments-container
import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container

import YearCardList from "../components/YearCardList";

import "../styles/YearCard.css"; // Import the CSS file
import "../styles/YearCardList.css"; // Import the CSS file

function HrPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );

  const [expandManager, setExpandManager] = useState<boolean>(false);

  //pass down handler function to set selected employee id
  const handleSelectedEmployee = (employeeID: number | null) => {
    setSelectedEmployeeID(employeeID);
  };

  //handle when manager is selected, to then output manager's direct reports
  const handleSelectedManager = (expand: boolean) => {
    setExpandManager(expand);
  };

  const handleBackClick = () => {
    setExpandManager(false);
    setSelectedEmployeeID(null);
  };

  const handleYearSelected = (year: number | null) => {
    console.log(`Year ${year} selected`);
    setSelectedYear(year);
  };

  //track expandManager state
  useEffect(() => {
    console.log("expandManager state:", expandManager);
  }, [expandManager]);

  return (
    <div>
      <Header />
      <div className="page">
        <div className="employee_list-container">
          <div className="employee-list-header">
            {expandManager && <BackButton handleBackClick={handleBackClick} />}
            <h3>{expandManager ? "Direct Reports" : "Managers"}</h3>
          </div>
          <EmployeeList
            dashboard={expandManager ? "ManagerDashboard" : "HRDashboard"}
            listType={expandManager ? "EmployeeList" : "ManagerList"}
            managerHID={selectedEmployeeID}
            expandManager={expandManager}
            setEmployeeID={handleSelectedEmployee}
            handleSelectedManager={handleSelectedManager}
          />
        </div>
        <div className="selected-employee-container">
          <SelectedEmployee EmployeeId={selectedEmployeeID} />
          <div className="performance-review-button-container">
            <PerformanceReviewButton
              linkTo="/ManagerReviewForm"
              reviewStatus="Finalized"
            />
          </div>
          <StartReviewProcessButton />
        </div>
        <div className="attachments-container">
          <div className="attachment-list-header">
            <h3>Attachments</h3>
            {/* Display performance review year only when both an employee and a year are selected */}
            {selectedEmployeeID !== null && selectedYear !== null ? (
              <p>Performance Review Year: {selectedYear}</p>
            ) : selectedEmployeeID !== null ? (
              <p>Please select a performance review year</p>
            ) : (
              <p>Please select an employee</p>
            )}
          </div>

          {/*conditionally render attachment list*/}
          {selectedEmployeeID && selectedYear && <AttachmentList />}
        </div>
        <div className="previous-years-container">
          {/*PREVIOUS REVIEWS*/}
          <YearCardList
            startYear={2023}
            endYear={2029}
            onYearSelected={handleYearSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default HrPage;
