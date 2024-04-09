//HR Dashboard
import { useEffect, useState } from "react";

import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";
import AttachmentList from "../components/AttachmentList";
import SelectedEmployee from "../components/SelectedEmployee";
import BackButton from "../components/BackButton";

import "../styles/HrDashboard.css";
import "../styles/EmployeeList.css";
import "../styles/Attachments.css"; //.attachments-container
import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container

function HrPage() {
  const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
    null
  );

  const [expandManager, setExpandManager] = useState<boolean>(false);

  //pass down handler function to set selected employee id
  const handleSelectedEmployee = (employeeID: number | null) => {
    setSelectedEmployeeID(employeeID);
  };

  const handleSelectedManager = (expand: boolean) => {
    setExpandManager(expand);
  };

  const handleBackClick = () => {
    setExpandManager(false);
  };

  //track expandManager state
  useEffect(() => {
    console.log("expandManager state:", expandManager);
  }, [expandManager]);

  return (
    <>
      <Header dashboard="HR" />
      <div className="employee_list-container">
        <div className="employee-list-header">
          {expandManager && <BackButton handleBackClick={handleBackClick} />}
          <h3>{expandManager ? "Direct Reports" : "Managers"}</h3>
        </div>
        <EmployeeList
          setEmployeeID={handleSelectedEmployee}
          dashboard={expandManager ? "ManagerDashboard" : "HRDashboard"}
          listType={expandManager ? "EmployeeList" : "ManagerList"}
          managerHID={expandManager ? 3 : -1}
          handleSelectedManager={handleSelectedManager}
          expandManager={expandManager}
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

export default HrPage;
