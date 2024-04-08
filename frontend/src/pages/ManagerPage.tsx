//Manager Dashboard
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import AttachmentList from "../components/AttachmentList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import SelectedEmployee from "../components/SelectedEmployee.tsx";

import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container
import "../styles/ManagerSection.css";
import "../styles/Attachments.css"; //.attachments-container

function ManagerPage() {
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );

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
        />
      </div>
      <div className="selected-employee-container">
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
        <p>Previous Reviews</p>
      </div>
    </>
  );
}

export default ManagerPage;
