//Employee Dashboard
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/InteractionsPane.css";
import "../styles/EmployeeDashboard.css";

export default function EmployeePage() {
  return (
    <>
      <Header dashboard="Employee" />
      <div className="employee-section">
        <div className="employee-dashboard">
          <div className="employee-rating-pane">
            {/*RATING CONTAINER */}
          </div>
          <div className="employee-criteria-pane">
            {/*CRITERIA CONTAINTER*/}
          </div>
        </div>
        <div className="employee-reminder">
          <Link to="/EmployeeReviewForm">
            <button type="button" className="performance-review-button">
              Take Me To My Performance Review
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
