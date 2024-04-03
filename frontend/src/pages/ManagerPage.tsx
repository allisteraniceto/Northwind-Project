//Manager Dashboard
//Employee Dashboard
import { Link } from "react-router-dom";
import Header from "../components/Header";
import EmployeeList from "../components/EmployeeList";
import AttachmentList from "../components/AttachmentList";
import PerformanceReviewButton from "../components/PerformanceReviewButton";

import "../styles/InteractionsPane.css"; //.interactions-section, .elected-employee-container, .previous-years-container
import "../styles/ManagerSection.css";
import "../styles/Attachments.css"; //.attachments-container
import StatusPane from "../components/StatusPane";

import "../styles/InteractionsPane.css";
import "../styles/ManagerSection.css";

function ManagerPage() {
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
            {/*PREVIOUS REVIEWS*/}
            <p>Previous Reviews</p>
          </div>
        </div>
      <div className="manager-section">
        <div className="employee_list-container">
          <EmployeeList />
        </div>
        <div className="interactions-section">
          <div className="selected-employee-container">
            {/*SELECTED EMPLOYEE*/}
            <p>Selected Employee</p>
            <div className="status-pane">
              <StatusPane status="Opened" email="john.doe@gmail.com" />
            </div>
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
            {/*PREVIOUS REVIEWS*/}
            <p>Previous Reviews</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManagerPage;
