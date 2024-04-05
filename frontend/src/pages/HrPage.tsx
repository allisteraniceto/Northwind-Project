//HR Dashboard
import { useState } from "react";

import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";

import "../styles/HrDashboard.css";
import "../styles/EmployeeList.css";
import "../styles/Attachments.css"; //.attachments-container
import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container

function HrPage() {
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );

  //pass down handler function to set selected employee id
  const handleSelectedEmployee = (employeeID: number | null) => {
    setSelectedEmployeeID(employeeID);
  };

  return (
    <>
      <Header dashboard="HR" />
      <div className="hr-section">
        <div className="employee_list-container">
          <div className="employee-list-header">
            <h3>Direct Reports</h3>
          </div>
          <EmployeeList setEmployeeID={handleSelectedEmployee} />
        </div>
        <div className="interactions-section">
          <div className="selected-employee-container">
            {/*SELECTED EMPLOYEE*/}
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
            <p>Previous Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HrPage;
